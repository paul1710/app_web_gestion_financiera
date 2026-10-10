import Sidebar from './Sidebar';
import Topbar from './Topbar';
import AuthModal from '../components/AuthModal';
import { useFinance } from '../stores/financeStore';

export default function AppLayout({ children }) {
  const { isAuthModalOpen, setIsAuthModalOpen } = useFinance();

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="stitch-main">
        <Topbar />
        <main>{children}</main>
      </div>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}
