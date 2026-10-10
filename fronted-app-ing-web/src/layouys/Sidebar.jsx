import { useFinance } from '../stores/financeStore';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'transactions', label: 'Transacciones', icon: 'receipt_long' },
  { id: 'budgets', label: 'Metas de Ahorro', icon: 'savings' },
  { id: 'clients', label: 'Directorio de Clientes', icon: 'group' },
  { id: 'settings', label: 'Ajustes', icon: 'settings' },
];

export default function Sidebar() {
  const { currentPage, setCurrentPage, user, isAuthenticated, logout, setIsAuthModalOpen } = useFinance();

  return (
    <aside className="stitch-sidebar">
      <div>
        {/* Brand Header */}
        <div className="stitch-brand">
          <div className="brand-icon">
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>account_balance</span>
          </div>
          <span className="brand-title">
            Finanzas <span>Pro</span>
          </span>
        </div>

        {/* Navigation Menu */}
        <nav className="stitch-nav" aria-label="Navegación principal">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setCurrentPage(item.id)}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Profile Card */}
      <div className="sidebar-profile">
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, cursor: 'pointer' }}
          onClick={() => setIsAuthModalOpen(true)}
          title="Ver o editar estado de conexión"
        >
          <div className="profile-avatar">
            {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
          </div>
          <div className="profile-info">
            <span className="profile-name">{user.name}</span>
            <span className="profile-role">{user.plan}</span>
          </div>
        </div>
        {isAuthenticated ? (
          <button
            className="btn-icon-logout"
            title="Cerrar sesión en API"
            type="button"
            onClick={logout}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>logout</span>
          </button>
        ) : (
          <button
            className="btn-icon-logout"
            title="Conectar a API / Iniciar sesión"
            type="button"
            onClick={() => setIsAuthModalOpen(true)}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--primary-light)' }}>login</span>
          </button>
        )}
      </div>
    </aside>
  );
}
