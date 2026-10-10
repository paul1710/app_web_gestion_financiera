export default function GoalCard({ goal, onDeposit, onDelete }) {
  const current = Number(goal.current_amount) || 0;
  const target = Number(goal.target_amount) || 1;
  const percent = Math.min(Math.round((current / target) * 100), 100);

  return (
    <div className="goal-card">
      <div>
        {/* Card Header */}
        <div className="goal-card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="goal-icon-box">
              <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>
                {goal.name.toLowerCase().includes('emergencia') ? 'shield' : goal.name.toLowerCase().includes('viaje') || goal.name.toLowerCase().includes('vacaciones') ? 'flight' : 'savings'}
              </span>
            </div>
            <div>
              <h3 className="goal-title">{goal.name}</h3>
              <span className="goal-deadline">{goal.category || 'Fondo Estratégico'}</span>
            </div>
          </div>
          <span className="kpi-tag">
            Vence: {goal.deadline || 'Indefinido'}
          </span>
        </div>

        {/* Metric Section */}
        <div style={{ marginTop: '16px', marginBottom: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--outline)' }}>
              Acumulado
            </span>
            <span className="kpi-badge income">
              {percent}%
            </span>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', fontWeight: 700, color: 'var(--text-white)' }}>
            ${current.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            <span style={{ fontSize: '13px', fontWeight: 400, color: 'var(--outline)', marginLeft: '6px' }}>
              de ${target.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-track">
          <div className="progress-bar" style={{ width: `${percent}%` }}></div>
        </div>

        {/* Mini Sparkline SVG */}
        <div style={{
          backgroundColor: 'var(--surface-container-low)',
          borderRadius: 'var(--radius-md)',
          padding: '10px 14px',
          margin: '14px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--outline)' }}>Rendimiento Estimado</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--income-emerald)', fontWeight: 600 }}>
              +4.2% APY
            </div>
          </div>
          <svg width="70" height="24" viewBox="0 0 80 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 24 L18 18 L34 20 L50 10 L66 12 L78 3" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 24 L18 18 L34 20 L50 10 L66 12 L78 3 V28 H2 Z" fill="#60a5fa" fillOpacity="0.12" />
          </svg>
        </div>

        {/* Notes */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--on-surface-variant)', fontSize: '12px' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--primary-light)' }}>check_circle</span>
          <span>{goal.notes || 'Meta en ritmo óptimo de aporte mensual'}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
        <button
          type="button"
          className="btn-secondary"
          style={{ flex: 1, justifyContent: 'center' }}
          onClick={() => onDeposit(goal)}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>add_circle</span>
          <span>Aportar Fondos</span>
        </button>
        {onDelete && (
          <button
            type="button"
            className="btn-icon-logout"
            title="Eliminar meta"
            style={{ padding: '8px', color: 'var(--expense-rose)' }}
            onClick={() => {
              if (window.confirm(`¿Seguro que deseas eliminar la meta "${goal.name}"?`)) {
                onDelete(goal.id);
              }
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>delete</span>
          </button>
        )}
      </div>
    </div>
  );
}
