import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { INITIAL_TRANSACTIONS, INITIAL_GOALS, INITIAL_CLIENTS } from './initialData';
import { healthApi, authApi, transactionsApi, budgetsApi, clientsApi, userApi } from '../api/axios';

const FinanceContext = createContext();

export function FinanceProvider({ children }) {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [goals, setGoals] = useState(INITIAL_GOALS);
  const [clients, setClients] = useState(INITIAL_CLIENTS);
  const [currency, setCurrency] = useState('USD');
  const [apiConnected, setApiConnected] = useState(false);
  const [apiInfo, setApiInfo] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState({
    id: 1,
    name: 'Paul Inamagua',
    email: 'paulinamagua@gmail.com',
    plan: 'Plan Pro / Finanzas Personales'
  });

  // Cálculos dinámicos
  const totalIngresos = transactions
    .filter(t => t.type === 'ingreso')
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const totalEgresos = transactions
    .filter(t => t.type === 'egreso')
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const saldoDisponible = totalIngresos - totalEgresos;

  // Cargar datos reales desde la API gestion_financiera
  const loadApiData = useCallback(async () => {
    let connected = false;

    // 1. Probar salud de la API
    try {
      const resHealth = await healthApi.checkHealth();
      if (resHealth.data && resHealth.data.status === 'online') {
        connected = true;
        setApiConnected(true);
        setApiInfo(resHealth.data);
      }
    } catch {
      // Ignorar si no responde
    }

    // 2. Probar clientes (endpoint público)
    try {
      const resClients = await clientsApi.getAll();
      if (resClients.data?.success && Array.isArray(resClients.data.data)) {
        connected = true;
        setApiConnected(true);
        if (resClients.data.data.length > 0) {
          setClients(resClients.data.data);
        }
      }
    } catch (err) {
      console.info('Endpoint de clientes no respondió:', err.message);
    }

    if (!connected) {
      setApiConnected(false);
      return;
    }

    // 3. Si hay token, consultar datos protegidos
    const token = localStorage.getItem('auth_token');
    if (token) {
      setIsAuthenticated(true);

      // Obtener usuario
      try {
        const resUser = await authApi.getMe();
        if (resUser.data?.data) {
          setUser({
            id: resUser.data.data.id,
            name: resUser.data.data.full_name || resUser.data.data.username,
            email: resUser.data.data.username,
            plan: 'API Conectada / Usuario Activo'
          });
        }
      } catch (e) {
        console.warn('Token no válido o sesión expirada', e);
        setIsAuthenticated(false);
        localStorage.removeItem('auth_token');
      }

      // Obtener transacciones del usuario
      try {
        const resTx = await transactionsApi.getAll();
        if (resTx.data?.success && Array.isArray(resTx.data.data) && resTx.data.data.length > 0) {
          setTransactions(resTx.data.data);
        }
      } catch (e) {
        console.warn('Error al obtener transacciones de la API', e);
      }

      // Obtener metas de ahorro
      try {
        const resGoals = await budgetsApi.getAll();
        if (resGoals.data?.success && Array.isArray(resGoals.data.data) && resGoals.data.data.length > 0) {
          setGoals(resGoals.data.data);
        }
      } catch (e) {
        console.warn('Error al obtener metas de la API', e);
      }

      // Obtener configuración de moneda
      try {
        const resSettings = await userApi.getSettings();
        if (resSettings.data?.data?.currency) {
          setCurrency(resSettings.data.data.currency);
        }
      } catch (e) {
        console.warn('Error al obtener ajustes de la API', e);
      }
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchInitialData = async () => {
      if (isMounted) {
        await loadApiData();
      }
    };
    fetchInitialData();
    return () => {
      isMounted = false;
    };
  }, [loadApiData]);

  // Iniciar Sesión en la API
  const login = async (username, password) => {
    const res = await authApi.login({ username, password });
    if (res.data?.success && res.data.data?.token) {
      localStorage.setItem('auth_token', res.data.data.token);
      setIsAuthenticated(true);
      setApiConnected(true);
      if (res.data.data.user) {
        setUser({
          id: res.data.data.user.id,
          name: res.data.data.user.full_name || res.data.data.user.username,
          email: res.data.data.user.username,
          plan: 'API Conectada / Usuario Activo'
        });
      }
      await loadApiData();
      return res.data;
    }
    throw new Error(res.data?.message || 'Error en inicio de sesión');
  };

  // Registrarse en la API
  const register = async (username, password, full_name) => {
    const res = await authApi.register({ username, password, full_name });
    if (res.data?.success) {
      return await login(username, password);
    }
    throw new Error(res.data?.message || 'Error al registrar usuario');
  };

  // Cerrar Sesión
  const logout = () => {
    localStorage.removeItem('auth_token');
    setIsAuthenticated(false);
    setUser({
      id: 0,
      name: 'Invitado',
      email: 'sin_sesion@local',
      plan: 'Modo Offline / Demo'
    });
  };

  // Agregar transacción (guarda en API si hay conexión)
  const addTransaction = async (newTx) => {
    try {
      if (isAuthenticated) {
        const res = await transactionsApi.create({
          date: newTx.date,
          amount: parseFloat(newTx.amount) || 0,
          type: newTx.type,
          category: newTx.category,
          description: newTx.description
        });
        if (res.data?.success && res.data.data) {
          setTransactions([res.data.data, ...transactions]);
          return;
        }
      }
    } catch (err) {
      console.warn('No se pudo guardar en la API, guardando localmente:', err.message);
    }

    // Fallback optimista
    const tx = {
      ...newTx,
      id: Date.now(),
      amount: parseFloat(newTx.amount) || 0
    };
    setTransactions([tx, ...transactions]);
  };

  // Agregar meta (guarda en API si hay conexión)
  const addGoal = async (newGoal) => {
    try {
      if (isAuthenticated) {
        const res = await budgetsApi.create({
          name: newGoal.name,
          target_amount: parseFloat(newGoal.target_amount) || 1000,
          current_amount: parseFloat(newGoal.current_amount) || 0,
          deadline: newGoal.deadline
        });
        if (res.data?.success && res.data.data) {
          setGoals([...goals, res.data.data]);
          return;
        }
      }
    } catch (err) {
      console.warn('No se pudo guardar en la API, guardando localmente:', err.message);
    }

    const goal = {
      ...newGoal,
      id: Date.now(),
      current_amount: parseFloat(newGoal.current_amount) || 0,
      target_amount: parseFloat(newGoal.target_amount) || 1000
    };
    setGoals([...goals, goal]);
  };

  // Aportar a meta (guarda en API si hay conexión)
  const trackGoalDeposit = async (goalId, amount) => {
    try {
      if (isAuthenticated) {
        const res = await budgetsApi.trackDeposit(goalId, parseFloat(amount));
        if (res.data?.success && res.data.data) {
          setGoals(goals.map(g => g.id === goalId ? res.data.data : g));
          return;
        }
      }
    } catch (err) {
      console.warn('No se pudo guardar aporte en API, aplicando localmente:', err.message);
    }

    setGoals(goals.map(g => {
      if (g.id === goalId) {
        return { ...g, current_amount: g.current_amount + Number(amount) };
      }
      return g;
    }));
  };

  // Agregar cliente (guarda en API si hay conexión)
  const addClient = async (newClient) => {
    try {
      const res = await clientsApi.create({
        nombre: newClient.nombre,
        email: newClient.email,
        telefono: newClient.telefono,
        direccion: newClient.direccion,
        estado: newClient.estado || 'ACTIVO'
      });
      if (res.data?.success && res.data.data) {
        setClients([...clients, res.data.data]);
        return;
      }
    } catch (err) {
      console.warn('No se pudo guardar cliente en API, guardando localmente:', err.message);
    }

    const client = {
      ...newClient,
      id: Date.now(),
      balance: parseFloat(newClient.balance) || 0,
      estado: newClient.estado || 'ACTIVO'
    };
    setClients([...clients, client]);
  };

  // Eliminar transacción
  const deleteTransaction = async (id) => {
    try {
      if (isAuthenticated) {
        await transactionsApi.delete(id);
      }
    } catch (err) {
      console.warn('Error al eliminar transacción en API:', err.message);
    }
    setTransactions(transactions.filter(t => t.id !== id));
  };

  // Eliminar meta de ahorro
  const deleteGoal = async (id) => {
    try {
      if (isAuthenticated) {
        await budgetsApi.delete(id);
      }
    } catch (err) {
      console.warn('Error al eliminar meta en API:', err.message);
    }
    setGoals(goals.filter(g => g.id !== id));
  };

  // Eliminar cliente
  const deleteClient = async (id) => {
    try {
      await clientsApi.delete(id);
    } catch (err) {
      console.warn('Error al eliminar cliente en API:', err.message);
    }
    setClients(clients.filter(c => c.id !== id));
  };

  return (
    <FinanceContext.Provider value={{
      currentPage,
      setCurrentPage,
      transactions,
      goals,
      clients,
      currency,
      setCurrency,
      user,
      totalIngresos,
      totalEgresos,
      saldoDisponible,
      apiConnected,
      apiInfo,
      isAuthenticated,
      isAuthModalOpen,
      setIsAuthModalOpen,
      login,
      register,
      logout,
      loadApiData,
      addTransaction,
      deleteTransaction,
      addGoal,
      deleteGoal,
      trackGoalDeposit,
      addClient,
      deleteClient
    }}>
      {children}
    </FinanceContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance debe usarse dentro de un FinanceProvider');
  }
  return context;
}

