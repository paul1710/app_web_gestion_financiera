# STITCH UI DESIGN SPECIFICATION: GESTIÓN FINANCIERA

Este documento está optimizado para herramientas de generación de interfaces (como Stitch). 
Contiene las reglas de diseño globales y especificaciones aisladas pantalla por pantalla para evitar sobreposiciones, modales rotos o renderizado de rutas de código.

---

## 1. Reglas Globales de Diseño (Stitch Theme Tokens)

- **Modo:** Dark Mode Estricto (No usar fondos blancos ni grises claros).
- **Fondos:**
  - Lienzo / App Background: `#0B0F19` (Slate ultrascuro)
  - Tarjetas y Contenedores: `#111827` (Gris oscuro elevado)
  - Bordes y Separadores: `#1F2937` (Gris sutil)
  - Superficies interactivas (Inputs / Hover): `#1F293D`
- **Colores Semánticos de Acento:**
  - Primario (Acciones / Botones): `#2563EB` (Azul corporativo)
  - Ingresos / Ganancia: `#10B981` (Esmeralda)
  - Egresos / Gastos: `#F43F5E` (Rosa / Carmín)
  - Advertencias / Metas: `#F59E0B` (Ámbar)
- **Tipografía:**
  - Interfaz y etiquetas: `Inter` (sans-serif)
  - Montos numéricos, balances y fechas: `JetBrains Mono` (monospace)
- **Regla de oro de generación:** No imprimir endpoints REST (POST, GET), tokens ni rutas técnicas dentro del canvas.

---

## 2. Prompts Aislados por Pantalla

---

### Pantalla A: Dashboard Principal (`/dashboard`)
*Usa este bloque completo en Stitch cuando vayas a generar la pantalla principal.*

```text
Create a desktop web dashboard layout (1280px width) for a FinTech personal finance app in strict Dark Mode.

Canvas Style:
- Background: #0B0F19
- Card background: #111827
- Borders: 1px solid #1F2937
- Border radius: 12px

Layout:
1. Left Sidebar Navigation (width: 240px, fixed):
   - Top logo: "Finanzas Pro" with a minimalist blue icon (#2563EB).
   - Menu items: Dashboard (Active), Transacciones, Metas de Ahorro, Clientes, Ajustes.
   - Bottom user profile pill: "Paul Inamagua" with avatar and logout icon.

2. Main Content Area (padding: 32px):
   - Top Header:
     - Title: "Resumen Financiero"
     - Subtitle: "Monitorea tus ingresos, egresos y liquidez del mes."
     - Right Actions: Currency tag "USD ($)", Button primary "+ Registrar Transacción".

   - Top Row - 3 Metric KPI Cards (3 columns grid):
     - Card 1: "Ingresos del Mes" -> Value: "$3,450.00" in green (#10B981), badge "+12.4% vs mes anterior".
     - Card 2: "Egresos del Mes" -> Value: "$1,210.50" in red (#F43F5E), badge "-4.1% vs mes anterior".
     - Card 3: "Saldo Disponible" -> Value: "$2,239.50" in white, subtitle "Capacidad de ahorro: 64%".

   - Middle Row - Data Visualizations (2 columns grid, 60% / 40%):
     - Left Card: "Flujo de Caja Mensual" -> Visual bar chart placeholder comparing Income (Green bars) vs Expenses (Red bars) across the last 6 months.
     - Right Card: "Metas Activas" -> 2 progress items:
       * "Fondo de Emergencia" ($7,500 / $10,000) with a 75% filled progress bar (Blue).
       * "Vacaciones" ($800 / $2,000) with a 40% filled progress bar (Amber).

   - Bottom Row - Recent Transactions Card:
     - Header: "Últimos Movimientos" with a "Ver todas" link.
     - Table with 3 rows: Date, Description, Category badge, Payment Method, and Amount with color indicator (+ verde / - rojo).
```

---

### Pantalla B: Formulario de Nueva Transacción (`/transactions/new`)
*Usa este bloque para generar el formulario de registro sin capas duplicadas.*

```text
Create a focused, clean transaction entry screen in strict Dark Mode (Background #0B0F19).

Layout:
- Max-width: 580px, centered on screen.
- Outer container: Card with background #111827, border 1px solid #1F2937, rounded-2xl, p-8.
- Top bar: Back arrow button "< Volver al historial" and title "Registrar Movimiento".

Form Elements:
1. Segmented Control / Type Switcher:
   - Two large toggle tabs: "[ + ] Ingreso" vs "[ - ] Egreso" (active state highlighted in bold color).
2. Large Amount Input:
   - Large centered display text field: "$ 0.00 USD" in JetBrains Mono font, large bold size.
3. Form Fields Grid (vertical stack, gap-4):
   - Date input: Defaulting to today's date with calendar icon.
   - Category selector: Dropdown (options: Salario, Alimentación, Servicios, Ocio, Otros).
   - Description field: Text input with placeholder "Ej: Pago de nómina quincenal".
   - Payment method dropdown: "Cuenta Principal (Banco)", "Efectivo", "Tarjeta de Crédito".
4. Actions:
   - Primary full-width button: "Guardar Transacción" (background #2563EB, text white, py-3).
   - Secondary text button: "Cancelar".

No background modals, no overlapping elements, clean vertical spacing.
```

---

### Pantalla C: Vista de Metas de Ahorro (`/budgets`)
*Usa este bloque para diseñar el módulo de metas de ahorro.*

```text
Create a "Metas de Ahorro y Presupuesto" screen in strict Dark Mode (Background #0B0F19).

Structure:
1. Top Section:
   - Title: "Metas de Ahorro"
   - Subtitle: "Establece objetivos de capital y realiza aportes directos."
   - Button: "+ Crear Nueva Meta" (Primary Blue).

2. Summary Metric Bar:
   - Total Ahorrado: "$8,300.00"
   - Meta Global: "$12,000.00"
   - Progreso General: 69.1% with wide progress bar.

3. Goals Grid (3 columns cards):
   - Card Component Specification:
     * Header: Goal Name (e.g., "Fondo de Emergencia"), Target Icon, Deadline Tag ("Vence: Dic 2026").
     * Current vs Target: "$7,500.00 de $10,000.00" (JetBrains Mono).
     * Progress bar: Visual fill with percentage pill (75%).
     * Bottom Action: Single button "Aportar Capital" (outlined style with small plus icon).
```

---

### Pantalla D: Directorio de Clientes (`/clientes`)
*Usa este bloque para maquetar la tabla de clientes.*

```text
Create a "Directorio de Clientes" data table screen in strict Dark Mode (Background #0B0F19).

Structure:
1. Header Bar:
   - Title: "Clientes Financieros"
   - Search bar: Placeholder "Buscar por nombre o correo..."
   - Action Button: "+ Nuevo Cliente"

2. Data Table Card (#111827 with 1px border #1F2937):
   - Columns: ID, Nombre Completo, Correo Electrónico, Teléfono, Estado, Acciones.
   - Status Badges: "Activo" (Green pill), "Inactivo" (Gray pill).
   - Row Actions: Edit icon, Delete icon.
   - Bottom Pagination: "Mostrando 1-10 de 45 resultados" with Prev/Next buttons.
```