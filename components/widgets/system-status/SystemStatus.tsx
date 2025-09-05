// components/widgets/system-status/SystemStatus.tsx
import React, { useState, useEffect } from 'react';

const SystemStatus: React.FC = () => {
  const [status, setStatus] = useState({ responseTime: 12, cpuUsage: 5 });

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Mock data, could be dynamic in a real app
      const responseTime = Math.floor(Math.random() * (30 - 8 + 1) + 8);
      const cpuUsage = Math.floor(Math.random() * (15 - 2 + 1) + 2);
      setStatus({ responseTime, cpuUsage });
    }, 2000); // Update every 2 seconds

    return () => clearInterval(intervalId);
  }, []);
  

  return (
    <div className="status-bar-widget" title="System Status">
      <span>🚀 {status.responseTime}ms</span>
      <span style={{ margin: '0 8px' }}>|</span>
      <span>🔥 {status.cpuUsage}% CPU</span>
    </div>
  );
};

export default SystemStatus;