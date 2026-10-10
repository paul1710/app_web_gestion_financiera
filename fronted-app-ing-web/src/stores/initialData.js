export const INITIAL_TRANSACTIONS = [
  { id: 1, date: '2026-10-09', description: 'Nómina Quincenal / Salario', category: 'Salario', method: 'Cuenta Principal', amount: 3450.00, type: 'ingreso' },
  { id: 2, date: '2026-10-08', description: 'Supermercado El Ahorro', category: 'Alimentación', method: 'Tarjeta Débito', amount: 186.40, type: 'egreso' },
  { id: 3, date: '2026-10-07', description: 'Servicio de Internet y Fibra', category: 'Servicios', method: 'Cuenta Principal', amount: 49.99, type: 'egreso' },
  { id: 4, date: '2026-10-05', description: 'Consultoría TI Externa', category: 'Freelance', method: 'Transferencia', amount: 850.00, type: 'ingreso' },
  { id: 5, date: '2026-10-03', description: 'Mantenimiento Vehículo', category: 'Transporte', method: 'Efectivo', amount: 120.00, type: 'egreso' }
];

export const INITIAL_GOALS = [
  { id: 1, name: 'Fondo de Emergencia', target_amount: 10000.00, current_amount: 7500.00, deadline: 'Dic 2026', category: 'Respaldo de Liquidez', notes: '3 meses de gastos esenciales cubiertos' },
  { id: 2, name: 'Vacaciones Familiares', target_amount: 2500.00, current_amount: 1200.00, deadline: 'Ago 2027', category: 'Ocio y Viajes', notes: 'Vuelos y hospedaje programado' },
  { id: 3, name: 'Renovación de Equipo TI', target_amount: 3000.00, current_amount: 2100.00, deadline: 'Nov 2026', category: 'Productividad', notes: 'Laptop y monitor ergonómico' }
];

export const INITIAL_CLIENTS = [
  { id: 101, nombre: 'Sofia Morales', email: 'sofia.morales@empresa.com', telefono: '+593 99 123 4567', direccion: 'Av. Amazonas 120', balance: 14250.00, estado: 'ACTIVO', tipo: 'Inversor Patrimonial' },
  { id: 102, nombre: 'Carlos Mendoza', email: 'carlos.mendoza@tech.ec', telefono: '+593 98 765 4321', direccion: 'Calle Larga 4-50', balance: 8400.00, estado: 'ACTIVO', tipo: 'Pyme Corporativa' },
  { id: 103, nombre: 'Elena Vasquez', email: 'elena.v@consulting.com', telefono: '+593 95 333 9988', direccion: 'Av. Remigio Crespo', balance: 3100.00, estado: 'INACTIVO', tipo: 'Consultor Independiente' },
  { id: 104, nombre: 'Andres Paredes', email: 'andres.p@comercial.ec', telefono: '+593 97 444 1122', direccion: 'Av. De las Américas', balance: 22800.00, estado: 'ACTIVO', tipo: 'Empresa Mayorista' }
];
