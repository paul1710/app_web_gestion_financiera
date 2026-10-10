export default function MetricCard({
  icon = 'payments',
  tone = 'blue',
  label,
  tag = 'Mensual',
  value,
  badgeText = '+0.0%',
  metaText = 'Meta: $0.00'
}) {
  return (
    <div className="kpi-card">
      <div className="kpi-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className={`kpi-icon-pill ${tone}`}>
            <span className="material-symbols-outlined">{icon}</span>
          </div>
          <span className="kpi-label">{label}</span>
        </div>
        <span className="kpi-tag">{tag}</span>
      </div>

      <div className={`kpi-value ${tone}`}>
        {value}
      </div>

      <div className="kpi-footer">
        <div className={`kpi-badge ${tone}`}>
          <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>
            {tone === 'expense' ? 'trending_down' : 'trending_up'}
          </span>
          <span>{badgeText}</span>
        </div>
        <span className="kpi-meta">{metaText}</span>
      </div>
    </div>
  );
}
