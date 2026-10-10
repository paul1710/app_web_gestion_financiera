import { useState } from 'react';
import { useFinance } from '../stores/financeStore';
import MetricCard from '../components/MetricCard';
import CashFlowChart from '../components/CashFlowChart';
import RecentTransactionsTable from '../components/RecentTransactionsTable';
import NewTransactionModal from '../components/NewTransactionModal';

export default function DashboardPage() {
  const { totalIngresos, totalEgresos, saldoDisponible, transactions, goals, setCurrentPage } = useFinance();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="page-breadcrumb">
            <span>Resumen General</span>
            <span>/</span>
            <span className="active">Octubre 2026</span>
          </div>
          <h1 className="page-title">Resumen Financiero</h1>
          <p className="page-subtitle">
            Monitorea tus ingresos, egresos y liquidez del mes con trazabilidad en tiempo real.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            type="button"
            className="btn-primary"
            onClick={() => setIsModalOpen(true)}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
            <span>+ Registrar Transacción</span>
          </button>
        </div>
      </div>

      {/* Row 1: 3 KPI Metric Cards */}
      <div className="kpi-grid">
        <MetricCard
          label="Ingresos del Mes"
          icon="arrow_downward_alt"
          tone="emerald"
          tag="Mensual"
          value={`$${totalIngresos.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
          badgeText="+12.4% vs mes anterior"
          metaText="Meta: $4,000"
        />

        <MetricCard
          label="Egresos del Mes"
          icon="arrow_upward_alt"
          tone="rose"
          tag="Controlado"
          value={`$${totalEgresos.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
          badgeText="-4.1% vs mes anterior"
          metaText="Límite: $2,000"
        />

        <MetricCard
          label="Saldo Disponible"
          icon="account_balance_wallet"
          tone="blue"
          tag="Liquidez"
          value={`$${saldoDisponible.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
          badgeText="Capacidad: 64%"
          metaText="Fondo activo"
        />
      </div>

      {/* Row 2: Charts and Goals Preview */}
      <div className="dashboard-grid">
        <CashFlowChart />

        {/* Metas Activas Preview Widget */}
        <div className="stitch-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div className="card-title-row">
            <div>
              <h2>Metas Activas</h2>
              <span style={{ fontSize: '12px', color: 'var(--outline)' }}>Progreso de fondos programados</span>
            </div>
            <button
              type="button"
              className="btn-secondary"
              style={{ fontSize: '11px', padding: '5px 10px' }}
              onClick={() => setCurrentPage('budgets')}
            >
              Ver todas
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {goals.slice(0, 3).map((g) => {
              const current = Number(g.current_amount) || 0;
              const target = Number(g.target_amount) || 1;
              const percent = Math.min(Math.round((current / target) * 100), 100);

              return (
                <div key={g.id} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <strong style={{ color: 'var(--text-white)' }}>{g.name}</strong>
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary-light)', fontSize: '12px' }}>
                      ${current.toLocaleString()} / ${target.toLocaleString()} ({percent}%)
                    </span>
                  </div>
                  <div className="progress-track" style={{ margin: 0, height: '6px' }}>
                    <div className="progress-bar" style={{ width: `${percent}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', marginTop: '16px' }}>
            <span style={{ fontSize: '12px', color: 'var(--on-surface-variant)' }}>
              Ritmo de ahorro general: <strong style={{ color: 'var(--income-emerald)' }}>Óptimo (69%)</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Row 3: Recent Transactions */}
      <RecentTransactionsTable
        transactions={transactions}
        onSeeAll={() => setCurrentPage('transactions')}
      />

      {/* New Transaction Modal */}
      <NewTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
