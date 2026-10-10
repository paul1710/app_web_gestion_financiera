import { useFinance } from '../stores/financeStore';
import DashboardPage from '../pages/DashboardPage';
import TransactionsPage from '../pages/TransactionsPage';
import BudgetsPage from '../pages/BudgetsPage';
import ClientsPage from '../pages/ClientsPage';
import SettingsPage from '../pages/SettingsPage';

export default function AppRoutes() {
  const { currentPage } = useFinance();

  switch (currentPage) {
    case 'dashboard':
      return <DashboardPage />;
    case 'transactions':
      return <TransactionsPage />;
    case 'budgets':
      return <BudgetsPage />;
    case 'clients':
      return <ClientsPage />;
    case 'settings':
      return <SettingsPage />;
    default:
      return <DashboardPage />;
  }
}
