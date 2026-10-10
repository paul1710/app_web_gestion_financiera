import { useState } from 'react';
import { useFinance } from '../stores/financeStore';
import NewClientModal from '../components/NewClientModal';

export default function ClientsPage() {
  const { clients, deleteClient } = useFinance();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filtered = clients.filter((c) => {
    const matchesStatus = statusFilter === 'Todos' || c.estado === statusFilter;
    const matchesSearch =
      c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="page-breadcrumb">
            <span>Cartera</span>
            <span>/</span>
            <span className="active">Directorio de Clientes</span>
          </div>
          <h1 className="page-title">Directorio de Clientes Financieros</h1>
          <p className="page-subtitle">
            Gestión y seguimiento de cartera de clientes y cuentas asociadas.
          </p>
        </div>

        <button
          type="button"
          className="btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
          <span>+ Nuevo Cliente</span>
        </button>
      </div>

      {/* Main Table Card */}
      <div className="stitch-card">
        {/* Toolbar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px', marginBottom: '20px' }}>
          {/* Search Input */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'var(--surface-interactive)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '8px 14px',
            width: '100%',
            maxWidth: '360px'
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--outline)' }}>search</span>
            <input
              type="text"
              placeholder="Buscar por nombre, correo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--text-white)',
                fontSize: '13px',
                width: '100%'
              }}
            />
          </div>

          {/* Status Filter */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {['Todos', 'ACTIVO', 'INACTIVO'].map((st) => (
              <button
                key={st}
                type="button"
                className={`btn-secondary ${statusFilter === st ? 'btn-primary' : ''}`}
                style={{ padding: '6px 14px', fontSize: '12px' }}
                onClick={() => setStatusFilter(st)}
              >
                {st === 'Todos' ? `Todos (${clients.length})` : st === 'ACTIVO' ? 'Activos' : 'Inactivos'}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="stitch-table">
            <thead>
              <tr>
                <th>ID Cliente</th>
                <th>Nombre Completo</th>
                <th>Correo Electrónico</th>
                <th>Teléfono</th>
                <th style={{ textAlign: 'right' }}>Saldo Administrado</th>
                <th style={{ textAlign: 'center' }}>Estado</th>
                <th style={{ textAlign: 'center' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '36px', color: 'var(--outline)' }}>
                    No se encontraron clientes registrados con este filtro.
                  </td>
                </tr>
              ) : (
                filtered.map((cli) => {
                  const initials = cli.nombre.split(' ').map(n => n[0]).join('').substring(0, 2);
                  const isActive = cli.estado === 'ACTIVO';

                  return (
                    <tr key={cli.id}>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--outline)' }}>
                        CLI-{String(cli.id).slice(-4)}
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: 'var(--radius-full)',
                            background: 'rgba(37, 99, 235, 0.2)',
                            color: 'var(--primary-light)',
                            fontWeight: 600,
                            fontSize: '11px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            {initials}
                          </div>
                          <div>
                            <strong style={{ color: 'var(--text-white)', display: 'block' }}>{cli.nombre}</strong>
                            <span style={{ fontSize: '11px', color: 'var(--outline)' }}>{cli.tipo || 'Cliente Financiero'}</span>
                          </div>
                        </div>
                      </td>
                      <td style={{ color: 'var(--on-surface-variant)' }}>
                        {cli.email}
                      </td>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--on-surface-variant)' }}>
                        {cli.telefono || 'Sin teléfono'}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <span className="font-mono-val" style={{ color: 'var(--text-white)' }}>
                          ${Number(cli.balance || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span className={`status-badge ${isActive ? 'active' : 'inactive'}`}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: isActive ? 'var(--income-emerald)' : 'var(--outline)' }}></span>
                          {cli.estado}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button
                          type="button"
                          className="btn-icon-logout"
                          title="Eliminar cliente"
                          style={{ padding: '4px', color: 'var(--expense-rose)' }}
                          onClick={() => {
                            if (window.confirm(`¿Seguro que deseas eliminar al cliente ${cli.nombre}?`)) {
                              deleteClient(cli.id);
                            }
                          }}
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>delete</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <NewClientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
