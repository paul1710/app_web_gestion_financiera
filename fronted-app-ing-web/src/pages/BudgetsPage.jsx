import { useState } from 'react';
import { useFinance } from '../stores/financeStore';
import GoalCard from '../components/GoalCard';
import DepositModal from '../components/DepositModal';

export default function BudgetsPage() {
  const { goals, addGoal, deleteGoal } = useFinance();
  const [selectedGoalForDeposit, setSelectedGoalForDeposit] = useState(null);
  const [isNewGoalOpen, setIsNewGoalOpen] = useState(false);

  // Form states for new goal
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('2000');
  const [currentAmount, setCurrentAmount] = useState('500');
  const [deadline, setDeadline] = useState('Dic 2026');
  const [category, setCategory] = useState('Fondo Estratégico');

  // Summary calculations
  const totalTarget = goals.reduce((sum, g) => sum + (Number(g.target_amount) || 0), 0);
  const totalCurrent = goals.reduce((sum, g) => sum + (Number(g.current_amount) || 0), 0);
  const generalProgress = totalTarget > 0 ? Math.min(Math.round((totalCurrent / totalTarget) * 100), 100) : 0;

  const handleCreateGoal = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Ingresa el nombre del fondo');
      return;
    }
    addGoal({
      name,
      target_amount: parseFloat(targetAmount) || 1000,
      current_amount: parseFloat(currentAmount) || 0,
      deadline,
      category,
      notes: 'Fondo activo creado recientemente'
    });
    setName('');
    setIsNewGoalOpen(false);
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="page-breadcrumb">
            <span>Fondos</span>
            <span>/</span>
            <span className="active">Presupuestos y Ahorro</span>
          </div>
          <h1 className="page-title">Metas de Ahorro Programadas</h1>
          <p className="page-subtitle">
            Planifica objetivos de liquidez, inversión patrimonial y contingencia.
          </p>
        </div>

        <button
          type="button"
          className="btn-primary"
          onClick={() => setIsNewGoalOpen(true)}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
          <span>+ Nueva Meta de Ahorro</span>
        </button>
      </div>

      {/* Top Consolidated Summary Bar */}
      <div className="stitch-card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', alignItems: 'center' }}>
          {/* Capital Asignado */}
          <div>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--outline)' }}>
              Capital Asignado Total
            </span>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '26px', fontWeight: 700, color: 'var(--text-white)' }}>
              ${totalCurrent.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <span style={{ fontSize: '12px', color: 'var(--income-emerald)' }}>
              Activo en cuentas de rendimiento
            </span>
          </div>

          {/* Meta Global */}
          <div>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--outline)' }}>
              Meta Global Agrupada
            </span>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '26px', fontWeight: 700, color: 'var(--primary-light)' }}>
              ${totalTarget.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <span style={{ fontSize: '12px', color: 'var(--outline)' }}>
              Diferencia restante: ${(totalTarget - totalCurrent).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>

          {/* Progreso General */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--outline)' }}>
                Progreso General
              </span>
              <strong style={{ fontFamily: 'var(--font-mono)', color: 'var(--income-emerald)', fontSize: '14px' }}>
                {generalProgress}%
              </strong>
            </div>
            <div className="progress-track" style={{ height: '10px', margin: 0 }}>
              <div className="progress-bar" style={{ width: `${generalProgress}%` }}></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--outline)', marginTop: '4px' }}>
              <span>{goals.length} objetivos activos</span>
              <span>Ritmo: Óptimo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Goals */}
      <div className="goals-grid">
        {goals.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            onDeposit={(g) => setSelectedGoalForDeposit(g)}
            onDelete={deleteGoal}
          />
        ))}
      </div>

      {/* Deposit Modal */}
      {selectedGoalForDeposit && (
        <DepositModal
          goal={selectedGoalForDeposit}
          onClose={() => setSelectedGoalForDeposit(null)}
        />
      )}

      {/* New Goal Modal */}
      {isNewGoalOpen && (
        <div className="modal-overlay" onClick={() => setIsNewGoalOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-white)' }}>
                Crear Meta de Ahorro
              </h2>
              <button type="button" className="btn-icon-logout" onClick={() => setIsNewGoalOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateGoal}>
              <div className="form-group">
                <label className="form-label">Nombre del Objetivo</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ej: Fondo de Emergencia, Vacaciones..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Monto Meta ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-input"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Aporte Inicial ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-input"
                    value={currentAmount}
                    onChange={(e) => setCurrentAmount(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Categoría</label>
                  <select
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Respaldo de Liquidez">Respaldo de Liquidez</option>
                    <option value="Ocio y Viajes">Ocio y Viajes</option>
                    <option value="Productividad">Productividad</option>
                    <option value="Inversión Inmobiliaria">Inversión Inmobiliaria</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Plazo Estimado</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Ej: Dic 2026"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '18px' }}>
                <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                  Crear Meta
                </button>
                <button type="button" className="btn-secondary" onClick={() => setIsNewGoalOpen(false)}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
