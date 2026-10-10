---
name: Gestión Financiera Dark System
colors:
  surface: '#0f131d'
  surface-dim: '#0f131d'
  surface-bright: '#353944'
  surface-container-lowest: '#0a0e18'
  surface-container-low: '#171b26'
  surface-container: '#1c1f2a'
  surface-container-high: '#262a35'
  surface-container-highest: '#313540'
  on-surface: '#dfe2f1'
  on-surface-variant: '#c3c6d7'
  inverse-surface: '#dfe2f1'
  inverse-on-surface: '#2c303b'
  outline: '#8d90a0'
  outline-variant: '#434655'
  surface-tint: '#b4c5ff'
  primary: '#b4c5ff'
  on-primary: '#002a78'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#0053db'
  secondary: '#bcc6e0'
  on-secondary: '#263045'
  secondary-container: '#3f495f'
  on-secondary-container: '#aeb8d2'
  tertiary: '#ffb596'
  on-tertiary: '#581e00'
  tertiary-container: '#bc4800'
  on-tertiary-container: '#ffede6'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#d8e2fd'
  secondary-fixed-dim: '#bcc6e0'
  on-secondary-fixed: '#111b2f'
  on-secondary-fixed-variant: '#3d475c'
  tertiary-fixed: '#ffdbcd'
  tertiary-fixed-dim: '#ffb596'
  on-tertiary-fixed: '#360f00'
  on-tertiary-fixed-variant: '#7d2d00'
  background: '#0f131d'
  on-background: '#dfe2f1'
  surface-variant: '#313540'
  app-bg: '#0B0F19'
  surface-card: '#111827'
  border-subtle: '#1F2937'
  surface-interactive: '#1F293D'
  income-emerald: '#10B981'
  expense-rose: '#F43F5E'
  warning-amber: '#F59E0B'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  metric-xl:
    fontFamily: JetBrains Mono
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  metric-lg:
    fontFamily: JetBrains Mono
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  metric-md:
    fontFamily: JetBrains Mono
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 22px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

# STITCH UI DESIGN SPECIFICATION: GESTIÓN FINANCIERA

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
  - Interfaz y etiquetas: Inter (sans-serif)
  - Montos numéricos, balances y fechas: JetBrains Mono (monospace)
- **Regla de oro:** No imprimir endpoints REST (POST, GET), tokens ni rutas técnicas dentro del canvas.
