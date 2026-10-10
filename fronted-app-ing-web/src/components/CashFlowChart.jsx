const mockMonthlyData = [
  { month: 'May', income: 2800, expense: 1400 },
  { month: 'Jun', income: 3100, expense: 1650 },
  { month: 'Jul', income: 2950, expense: 1200 },
  { month: 'Ago', income: 3600, expense: 1900 },
  { month: 'Sep', income: 3200, expense: 1350 },
  { month: 'Oct', income: 3450, expense: 1210 }
];

export default function CashFlowChart() {
  const maxVal = 4000;

  return (
    <div className="stitch-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div className="card-title-row">
        <div>
          <h2>Flujo de Caja Mensual</h2>
          <span style={{ fontSize: '12px', color: 'var(--outline)' }}>Comparativa semestral de Ingresos vs. Egresos</span>
        </div>
        <span className="kpi-tag">Últimos 6 Meses</span>
      </div>

      <div className="chart-container">
        {/* Y Axis Labels */}
        <div className="chart-y-axis">
          <span>$4k</span>
          <span>$3k</span>
          <span>$2k</span>
          <span>$1k</span>
          <span>$0</span>
        </div>

        {/* Bars Container */}
        <div className="chart-bars-wrap">
          {mockMonthlyData.map((d) => {
            const incomeHeight = Math.round((d.income / maxVal) * 150);
            const expenseHeight = Math.round((d.expense / maxVal) * 150);

            return (
              <div key={d.month} className="bar-month">
                <div className="bars-pair">
                  <div
                    className="bar-col income"
                    style={{ height: `${incomeHeight}px` }}
                    title={`Ingreso: $${d.income}`}
                  ></div>
                  <div
                    className="bar-col expense"
                    style={{ height: `${expenseHeight}px` }}
                    title={`Egreso: $${d.expense}`}
                  ></div>
                </div>
                <span className="month-label">{d.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="chart-legend">
        <div>
          <span className="legend-dot income"></span>
          <span>Ingresos Recibidos</span>
        </div>
        <div>
          <span className="legend-dot expense"></span>
          <span>Egresos Totales</span>
        </div>
      </div>
    </div>
  );
}
