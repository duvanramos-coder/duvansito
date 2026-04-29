import { useState } from 'react';
import { DashboardData, Screen } from './types';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [screen, setScreen] = useState<Screen>('login');
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  const handleLoginSuccess = (data: DashboardData) => {
    setDashboardData(data);
    setScreen('dashboard');
  };

  const handleLogout = () => {
    setScreen('login');
    setDashboardData(null);
  };

  return (
    <div className="min-h-screen bg-dashboard-bg overflow-x-hidden">
      <AnimatePresence mode="wait">
        {screen === 'login' ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Login onLoginSuccess={handleLoginSuccess} />
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {dashboardData && (
              <Dashboard data={dashboardData} onLogout={handleLogout} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
