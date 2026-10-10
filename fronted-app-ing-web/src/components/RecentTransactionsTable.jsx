export default function RecentTransactionsTable({ transactions = [], onSeeAll }) {
  return (
    <div className="stitch-card">
      <div className="card-title-row">
        <div>
          <h2>Últimos Movimientos</h2>
          <span style={{ fontSize: '12px', color: 'var(--outline)' }}>Conciliación bancaria y registros de ingresos y egresos</span>
        </div>
        {onSeeAll && (
          <button
            type="button"
            className="btn-secondary"
            style={{ fontSize: '12px', padding: '6px 12px' }}
            onClick={onSeeAll}
          >
            Ver todas ({transactions.length})
          </button>
        )}
      </div>

      <div className="table-responsive">
        <table className="stitch-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Método / Cuenta</th>
              <th style={{ textAlign: 'right' }}>Monto</th>
            </tr>
          </thead>
          <tbody>
            {transactions.slice(0, 6).map((tx) => {
              const isIncome = tx.type === 'ingreso';
              return (
                <tr key={tx.id}>
                  <td style={{ color: 'var(--outline)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
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
                    <span className={`font-mono-val ${isIncome ? 'income' : 'expense'}`}>
                      {isIncome ? '+' : '-'}${Number(tx.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
