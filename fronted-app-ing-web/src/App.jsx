import { FinanceProvider } from './stores/financeStore';
import AppLayout from './layouys/AppLayout';
import AppRoutes from './routes/AppRoutes';
import './App.css';

export default function App() {
  return (
    <FinanceProvider>
      <AppLayout>
        <AppRoutes />
      </AppLayout>
    </FinanceProvider>
  );
}
