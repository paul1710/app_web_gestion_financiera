import { useState } from 'react';
import { useFinance } from '../stores/financeStore';

export default function NewClientModal({ isOpen, onClose }) {
  const { addClient } = useFinance();

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [balance, setBalance] = useState('5000.00');
  const [tipo, setTipo] = useState('Inversor Patrimonial');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim() || !email.trim()) {
      alert('Nombre y email son obligatorios');
      return;
    }

    addClient({
      nombre,
      email,
      telefono: telefono || '+593 99 000 0000',
      direccion: direccion || 'N/A',
      balance: parseFloat(balance) || 0,
      tipo,
      estado: 'ACTIVO'
    });

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-white)' }}>
              Nuevo Cliente Financiero
            </h2>
            <span style={{ fontSize: '12px', color: 'var(--on-surface-variant)' }}>
              Registrar en la cartera de clientes
            </span>
          </div>
          <button type="button" className="btn-icon-logout" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nombre Completo</label>
            <input
              type="text"
              className="form-input"
              placeholder="Ej: Sofia Morales"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div className="form-group">
              <label className="form-label">Correo Electrónico</label>
              <input
                type="email"
                className="form-input"
                placeholder="cliente@empresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Teléfono</label>
              <input
                type="text"
                className="form-input"
                placeholder="+593 99..."
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div className="form-group">
              <label className="form-label">Tipo de Cuenta</label>
              <select
                className="form-select"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
              >
                <option value="Inversor Patrimonial">Inversor Patrimonial</option>
                <option value="Pyme Corporativa">Pyme Corporativa</option>
                <option value="Consultor Independiente">Consultor Independiente</option>
                <option value="Empresa Mayorista">Empresa Mayorista</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Saldo Inicial ($)</label>
              <input
                type="number"
                step="0.01"
                className="form-input"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Dirección Fiscal</label>
            <input
              type="text"
              className="form-input"
              placeholder="Av. Principal 123..."
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button
              type="submit"
              className="btn-primary"
              style={{ flex: 1, justifyContent: 'center' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>person_add</span>
              <span>Guardar Cliente</span>
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
