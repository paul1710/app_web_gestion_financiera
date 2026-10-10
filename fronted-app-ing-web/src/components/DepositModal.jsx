import { useState } from 'react';
import { useFinance } from '../stores/financeStore';

export default function DepositModal({ goal, onClose }) {
  const { trackGoalDeposit, currency } = useFinance();
  const [amount, setAmount] = useState('100.00');

  if (!goal) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (!val || val <= 0) {
      alert('Ingresa un monto positivo');
      return;
    }
    trackGoalDeposit(goal.id, val);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-white)' }}>
              Aportar a Meta
            </h2>
            <span style={{ fontSize: '12px', color: 'var(--primary-light)' }}>
              {goal.name}
            </span>
          </div>
          <button type="button" className="btn-icon-logout" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="amount-input-box" style={{ padding: '16px' }}>
            <span className="hint">Monto a depositar</span>
            <div className="amount-input-row">
              <span className="amount-currency">$</span>
              <input
                type="number"
                step="0.01"
                min="1"
                className="amount-input-large"
                style={{ fontSize: '30px', width: '160px' }}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                autoFocus
                required
              />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--outline)' }}>{currency}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '18px' }}>
            <button
              type="submit"
              className="btn-primary"
              style={{ flex: 1, justifyContent: 'center' }}
            >
              Confirmar Depósito
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
