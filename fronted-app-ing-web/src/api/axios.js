import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Interceptor para inyectar token de autenticación
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar respuestas y errores de sesión
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Token expirado o inválido
      console.warn('Sesión no autorizada o expirada.');
    }
    return Promise.reject(error);
  }
);

export default api;

/* ==========================================================================
   SERVICIOS API
   ========================================================================== */

export const healthApi = {
  checkHealth: () => api.get('/health'),
};

export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
};

export const transactionsApi = {
  getAll: () => api.get('/transactions'),
  getResumen: (inicio, fin) => api.get('/transactions/resumen', { params: { inicio, fin } }),
  getById: (id) => api.get(`/transactions/${id}`),
  create: (data) => api.post('/transactions', data),
  update: (id, data) => api.put(`/transactions/${id}`, data),
  delete: (id) => api.delete(`/transactions/${id}`),
};

export const budgetsApi = {
  getAll: () => api.get('/budgets'),
  getById: (id) => api.get(`/budgets/${id}`),
  create: (data) => api.post('/budgets', data),
  update: (id, data) => api.put(`/budgets/${id}`, data),
  delete: (id) => api.delete(`/budgets/${id}`),
  trackDeposit: (id, amount) => api.post(`/budgets/${id}/track`, { amount }),
};

export const dashboardApi = {
  getProgresoAhorro: () => api.get('/dashboard/progreso-ahorro'),
};

export const clientsApi = {
  getAll: () => api.get('/clientes'),
  getById: (id) => api.get(`/clientes/${id}`),
  create: (data) => api.post('/clientes', data),
  update: (id, data) => api.put(`/clientes/${id}`, data),
  delete: (id) => api.delete(`/clientes/${id}`),
};

export const userApi = {
  getProfile: () => api.get('/user'),
  updateProfile: (data) => api.put('/user', data),
  getSettings: () => api.get('/user/configuracion'),
  updateSettings: (data) => api.put('/user/configuracion', data),
};
