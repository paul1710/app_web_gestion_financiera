import { useState } from 'react';
import { useFinance } from '../stores/financeStore';

export default function SettingsPage() {
  const { user, currency, setCurrency } = useFinance();
  const [fullName, setFullName] = useState(user.name);
  const [monthlyIncome, setMonthlyIncome] = useState('3500');
  const [savedMessage, setSavedMessage] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <div className="page-container" style={{ maxWidth: '800px' }}>
      <div className="page-header">
        <div>
          <div className="page-breadcrumb">
            <span>Terminal</span>
            <span>/</span>
            <span className="active">Ajustes</span>
          </div>
          <h1 className="page-title">Configuración de Perfil y Moneda</h1>
          <p className="page-subtitle">
            Personaliza tus preferencias contables y datos de cuenta.
          </p>
        </div>
      </div>

      <div className="stitch-card">
        {savedMessage && (
          <div style={{
            padding: '12px 16px',
            backgroundColor: 'var(--income-emerald-bg)',
            color: 'var(--income-emerald)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span className="material-symbols-outlined">check_circle</span>
            <span>Preferencias guardadas exitosamente.</span>
          </div>
        )}

        <form onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label">Nombre Completo</label>
            <input
              type="text"
              className="form-input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Moneda Predeterminada</label>
              <select
                className="form-select"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="USD">Dólar Estadounidense (USD $)</option>
                <option value="EUR">Euro (EUR €)</option>
                <option value="COP">Peso Colombiano (COP $)</option>
                <option value="MXN">Peso Mexicano (MXN $)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Ingreso Mensual Estimado</label>
              <input
                type="number"
                className="form-input"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Correo Electrónico (Registrado)</label>
            <input
              type="email"
              className="form-input"
              value={user.email}
              disabled
              style={{ opacity: 0.7, cursor: 'not-allowed' }}
            />
          </div>

          <div style={{ marginTop: '24px' }}>
            <button type="submit" className="btn-primary" style={{ padding: '10px 24px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>save</span>
              <span>Guardar Cambios</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
