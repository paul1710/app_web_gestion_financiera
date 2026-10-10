import { useState } from 'react';
import { useFinance } from '../stores/financeStore';
import NewTransactionModal from '../components/NewTransactionModal';

export default function TransactionsPage() {
  const { transactions, deleteTransaction } = useFinance();
  const [filterType, setFilterType] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filtered = transactions.filter((t) => {
    const matchesType = filterType === 'todos' || t.type === filterType;
    const matchesSearch =
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="page-breadcrumb">
            <span>Terminal</span>
            <span>/</span>
            <span className="active">Historial de Transacciones</span>
          </div>
          <h1 className="page-title">Libro Diario de Movimientos</h1>
          <p className="page-subtitle">
            Control detallado de todos los ingresos percibidos y egresos devengados.
          </p>
        </div>

        <button
          type="button"
          className="btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
          <span>+ Registrar Movimiento</span>
        </button>
      </div>

      {/* Table Card with Toolbar */}
      <div className="stitch-card">
        {/* Toolbar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '14px', marginBottom: '20px' }}>
          {/* Search Box */}
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
              placeholder="Buscar por descripción, categoría..."
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

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              className={`btn-secondary ${filterType === 'todos' ? 'btn-primary' : ''}`}
              style={{ padding: '6px 14px', fontSize: '12px' }}
              onClick={() => setFilterType('todos')}
            >
              Todos ({transactions.length})
            </button>
            <button
              type="button"
              className={`btn-secondary ${filterType === 'ingreso' ? 'btn-primary' : ''}`}
              style={{ padding: '6px 14px', fontSize: '12px', color: filterType === 'ingreso' ? '#fff' : 'var(--income-emerald)' }}
              onClick={() => setFilterType('ingreso')}
            >
              [ + ] Ingresos
            </button>
            <button
              type="button"
              className={`btn-secondary ${filterType === 'egreso' ? 'btn-primary' : ''}`}
              style={{ padding: '6px 14px', fontSize: '12px', color: filterType === 'egreso' ? '#fff' : 'var(--expense-rose)' }}
              onClick={() => setFilterType('egreso')}
            >
              [ − ] Egresos
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="stitch-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Descripción</th>
                <th>Categoría</th>
                <th>Método de Pago</th>
                <th style={{ textAlign: 'right' }}>Monto</th>
                <th style={{ textAlign: 'center' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '36px', color: 'var(--outline)' }}>
                    No se encontraron transacciones registradas con estos filtros.
                  </td>
                </tr>
              ) : (
                filtered.map((tx) => {
                  const isIncome = tx.type === 'ingreso';
                  return (
                    <tr key={tx.id}>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--outline)' }}>
                        TX-{String(tx.id).slice(-4)}
                      </td>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--outline)' }}>
                        {tx.date}
                      </td>
                      <td>
                        <strong style={{ color: 'var(--text-white)' }}>{tx.description}</strong>
                      </td>
                      <td>
                        <span className="category-badge">
                          <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>
                            {isIncome ? 'attach_money' : 'receipt'}
                          </span>
                          {tx.category}
                        </span>
                      </td>
                      <td style={{ color: 'var(--on-surface-variant)' }}>
                        {tx.method || 'Cuenta Bancaria'}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <span className={`font-mono-val ${isIncome ? 'income' : 'expense'}`} style={{ fontSize: '14px' }}>
                          {isIncome ? '+' : '-'}${Number(tx.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button
                          type="button"
                          className="btn-icon-logout"
                          title="Eliminar transacción"
                          style={{ padding: '4px', color: 'var(--expense-rose)' }}
                          onClick={() => {
                            if (window.confirm('¿Seguro que deseas eliminar esta transacción?')) {
                              deleteTransaction(tx.id);
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

      <NewTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
