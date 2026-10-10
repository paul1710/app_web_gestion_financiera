import { useState } from 'react';
import { useFinance } from '../stores/financeStore';

export default function NewTransactionModal({ isOpen, onClose }) {
  const { addTransaction, currency } = useFinance();

  const [type, setType] = useState('ingreso');
  const [amount, setAmount] = useState('0.00');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState('salario');
  const [description, setDescription] = useState('');
  const [method, setMethod] = useState('Cuenta Principal');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (!parsedAmount || parsedAmount <= 0) {
      alert('Por favor ingresa un monto válido mayor a 0');
      return;
    }

    addTransaction({
      date,
      amount: parsedAmount,
      type,
      category: category.charAt(0).toUpperCase() + category.slice(1),
      description: description || (type === 'ingreso' ? 'Ingreso general' : 'Gasto general'),
      method
    });

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px' }}>
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-white)' }}>
              Registrar Movimiento
            </h2>
            <span style={{ fontSize: '12px', color: 'var(--on-surface-variant)' }}>
              Conciliación del balance financiero
            </span>
          </div>
          <button
            type="button"
            className="btn-icon-logout"
            onClick={onClose}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* 1. Segmented Control / Type Switcher */}
          <div className="type-segmented-control">
            <button
              type="button"
              className={`type-tab ${type === 'ingreso' ? 'active income' : ''}`}
              onClick={() => { setType('ingreso'); setCategory('salario'); }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_circle_down</span>
              <span>[ + ] Ingreso</span>
            </button>
            <button
              type="button"
              className={`type-tab ${type === 'egreso' ? 'active expense' : ''}`}
              onClick={() => { setType('egreso'); setCategory('alimentacion'); }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_circle_up</span>
              <span>[ − ] Egreso</span>
            </button>
          </div>

          {/* 2. Large Amount Input Display */}
          <div className="amount-input-box">
            <span className="hint">Monto de la Operación</span>
            <div className="amount-input-row">
              <span className={`amount-currency ${type === 'egreso' ? 'expense' : ''}`}>$</span>
              <input
                type="number"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="amount-input-large"
                autoFocus
                required
              />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--outline)' }}>{currency}</span>
            </div>
            <span style={{ fontSize: '11px', color: 'var(--outline)' }}>
              {type === 'ingreso' ? 'Aumentará tu saldo disponible' : 'Se restará de tu liquidez'}
            </span>
          </div>

          {/* 3. Form Fields Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
            {/* Fecha */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Fecha del Movimiento</label>
              <input
                type="date"
                className="form-input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            {/* Categoría */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Categoría</label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {type === 'ingreso' ? (
                  <>
                    <option value="salario">Salario / Nómina</option>
                    <option value="freelance">Freelance / Servicios</option>
                    <option value="inversiones">Inversiones & Dividendos</option>
                    <option value="ventas">Ventas</option>
                    <option value="otros">Otros Ingresos</option>
                  </>
                ) : (
                  <>
                    <option value="alimentacion">Alimentación</option>
                    <option value="servicios">Servicios Básicos</option>
                    <option value="vivienda">Vivienda / Alquiler</option>
                    <option value="transporte">Transporte / Combustible</option>
                    <option value="ocio">Ocio y Entretenimiento</option>
                    <option value="otros">Otros Gastos</option>
                  </>
                )}
              </select>
            </div>
          </div>

          {/* Descripción */}
          <div className="form-group">
            <label className="form-label">Descripción o Concepto</label>
            <input
              type="text"
              className="form-input"
              placeholder="Ej: Pago de nómina quincenal, Supermercado..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Método de Pago */}
          <div className="form-group">
            <label className="form-label">Método de Pago / Cuenta</label>
            <select
              className="form-select"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option value="Cuenta Principal">Cuenta Principal (Banco •••• 8821)</option>
              <option value="Efectivo">Efectivo en Caja</option>
              <option value="Tarjeta Débito">Tarjeta de Débito</option>
              <option value="Tarjeta Crédito">Tarjeta de Crédito Corporativa</option>
            </select>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '22px' }}>
            <button
              type="submit"
              className="btn-primary"
              style={{ flex: 1, justifyContent: 'center', padding: '12px' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>save</span>
              <span>Guardar Transacción</span>
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
              style={{ padding: '12px 18px' }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
