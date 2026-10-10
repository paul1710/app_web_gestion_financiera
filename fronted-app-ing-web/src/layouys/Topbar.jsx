import { useFinance } from '../stores/financeStore';

export default function Topbar() {
  const { currency, user, apiConnected, isAuthenticated, setIsAuthModalOpen, loadApiData } = useFinance();

  return (
    <header className="stitch-topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span className="topbar-terminal-tag">TERMINAL FINANCIERA</span>

        {/* API Status Badge */}
        <button
          type="button"
          onClick={() => {
            if (!apiConnected) loadApiData();
            setIsAuthModalOpen(true);
          }}
          title={apiConnected ? 'API Conectada a backend gestion_financiera' : 'Click para reintentar conexión con gestion_financiera'}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '7px',
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)',
            border: `1px solid ${
              isAuthenticated
                ? 'rgba(16, 185, 129, 0.4)'
                : apiConnected
                ? 'rgba(59, 130, 246, 0.4)'
                : 'rgba(239, 68, 68, 0.3)'
            }`,
            backgroundColor: isAuthenticated
              ? 'rgba(16, 185, 129, 0.12)'
              : apiConnected
              ? 'rgba(59, 130, 246, 0.12)'
              : 'rgba(239, 68, 68, 0.1)',
            color: isAuthenticated
              ? 'var(--income-emerald)'
              : apiConnected
              ? '#60a5fa'
              : 'var(--expense-rose)',
            fontSize: '11px',
            fontFamily: 'var(--font-mono)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: isAuthenticated
                ? 'var(--income-emerald)'
                : apiConnected
                ? '#60a5fa'
                : 'var(--expense-rose)',
              boxShadow: isAuthenticated ? '0 0 8px var(--income-emerald)' : 'none',
            }}
          />
          <span>
            {isAuthenticated
              ? 'API Conectada (:3000)'
              : apiConnected
              ? 'API Online • Iniciar Sesión'
              : 'API Desconectada (:3000)'}
          </span>
        </button>
      </div>

      <div className="topbar-actions">
        {/* Search quick button */}
        <div className="search-pill">
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>search</span>
          <span style={{ display: 'inline-block' }}>Buscar movimientos o cuentas...</span>
        </div>

        {/* Currency badge selector */}
        <div className="currency-badge">
          <span className="currency-indicator"></span>
          <span>{currency} ($)</span>
        </div>

        {/* Refresh API Data button */}
        <button
          className="btn-icon-logout"
          style={{ padding: '6px', color: 'var(--on-surface-variant)' }}
          title="Sincronizar con API"
          type="button"
          onClick={() => loadApiData()}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>sync</span>
        </button>

        {/* Notifications & Help */}
        <button
          className="btn-icon-logout"
          style={{ padding: '6px', color: 'var(--on-surface-variant)' }}
          title="Notificaciones"
          type="button"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>notifications</span>
        </button>

        {/* User Mini Avatar */}
        <div
          className="profile-avatar"
          style={{ width: '30px', height: '30px', fontSize: '11px', cursor: 'pointer' }}
          onClick={() => setIsAuthModalOpen(true)}
          title="Cuenta de usuario"
        >
          {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
        </div>
      </div>
    </header>
  );
}
