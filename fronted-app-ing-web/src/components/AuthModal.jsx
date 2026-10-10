import { useState } from 'react';
import { useFinance } from '../stores/financeStore';

export default function AuthModal({ isOpen, onClose }) {
  const { login, register, apiConnected, loadApiData } = useFinance();
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('demo_user');
  const [password, setPassword] = useState('123456');
  const [fullName, setFullName] = useState('Paul Inamagua');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (isRegister) {
        await register(username, password, fullName);
        setSuccessMsg('¡Usuario registrado e inicio de sesión exitoso!');
      } else {
        await login(username, password);
        setSuccessMsg('¡Inicio de sesión exitoso!');
      }
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Error al conectar con la API';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '460px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-white)' }}>
              {isRegister ? 'Crear Cuenta en API' : 'Conectar con API'}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
              <span style={{ fontSize: '12px', color: apiConnected ? 'var(--income-emerald)' : 'var(--warning-amber)' }}>
                {apiConnected ? '● API Gestión Financiera Online (Port 3000)' : '○ API Desconectada (Puerto 3000)'}
              </span>
              {!apiConnected && (
                <button
                  type="button"
                  onClick={() => loadApiData()}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--primary-light)',
                    fontSize: '11px',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  Reintentar
                </button>
              )}
            </div>
          </div>
          <button type="button" className="btn-icon-logout" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {!apiConnected && (
          <div style={{
            padding: '10px 14px',
            backgroundColor: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '16px',
            fontSize: '12px',
            color: 'var(--outline)'
          }}>
            💡 <strong>API backend en la misma carpeta:</strong> Abre una segunda terminal en <code style={{ color: 'var(--primary-light)' }}>gestion_financiera</code> y ejecuta <code style={{ color: 'var(--income-emerald)' }}>npm run dev</code>.
          </div>
        )}

        {/* Tab switch */}
        <div className="type-segmented-control" style={{ marginBottom: '18px' }}>
          <button
            type="button"
            className={`type-tab ${!isRegister ? 'active income' : ''}`}
            onClick={() => { setIsRegister(false); setErrorMsg(''); }}
          >
            Iniciar Sesión
          </button>
          <button
            type="button"
            className={`type-tab ${isRegister ? 'active income' : ''}`}
            onClick={() => { setIsRegister(true); setErrorMsg(''); }}
          >
            Registrarse
          </button>
        </div>

        {errorMsg && (
          <div style={{
            padding: '10px 14px',
            backgroundColor: 'var(--expense-rose-bg)',
            color: 'var(--expense-rose)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '16px',
            fontSize: '12.5px'
          }}>
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div style={{
            padding: '10px 14px',
            backgroundColor: 'var(--income-emerald-bg)',
            color: 'var(--income-emerald)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '16px',
            fontSize: '12.5px'
          }}>
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="form-group">
              <label className="form-label">Nombre Completo</label>
              <input
                type="text"
                className="form-input"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ej: Paul Inamagua"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Usuario (Username)</label>
            <input
              type="text"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ej: paulinamagua"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '22px' }}>
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              style={{ flex: 1, justifyContent: 'center' }}
            >
              {loading ? 'Conectando...' : isRegister ? 'Registrarse y Conectar' : 'Iniciar Sesión'}
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
