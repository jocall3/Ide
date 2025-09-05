// features/dashboard/DashboardView.tsx
import React from 'react';
import { useAuthStore } from '../auth/useAuthStore';
import { useUIStore } from '../../store/uiStore';

const DashboardCard: React.FC<{ title: string; value: string }> = ({ title, value }) => (
  <div className="dashboard-card">
    <h3 className="dashboard-card-title">{title}</h3>
    <p className="dashboard-card-value">{value}</p>
  </div>
);

const DashboardView: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore();
  const { setActiveViewlet } = useUIStore();

  if (!isAuthenticated) {
    return (
      <div className="dashboard-view" style={{ textAlign: 'center', paddingTop: '2rem' }}>
        <h2>Welcome!</h2>
        <p>Please log in to see your dashboard.</p>
        <button className="button" style={{maxWidth: '200px'}} onClick={() => setActiveViewlet('auth')}>
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard-view">
      <h2>Hello, {user?.username}!</h2>
      <p>Here's a summary of your project:</p>
      <div className="dashboard-cards">
        <DashboardCard title="Active Files" value="12" />
        <DashboardCard title="Commits (24h)" value="7" />
        <DashboardCard title="Open PRs" value="3" />
        <DashboardCard title="Build Status" value="✅" />
      </div>
    </div>
  );
};

export default DashboardView;
