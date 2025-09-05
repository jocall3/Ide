// components/shell/ActivityBar.tsx

import React, { useState, useEffect } from 'react';
import { runtimeEngine } from '../../runtime/engine';
import { useUIStore } from '../../store/uiStore';
import { ViewletModule } from '../../runtime/types';

const ActivityBar: React.FC = () => {
  // Subscribe to modulesVersion to force re-render when modules change
  const modulesVersion = useUIStore((state) => state.modulesVersion);
  const [viewlets, setViewlets] = useState<ViewletModule[]>([]);

  useEffect(() => {
    setViewlets(runtimeEngine.getViewlets());
  }, [modulesVersion]); // Re-fetch viewlets when version changes

  const topViewlets = viewlets.filter(v => v.position === 'top');
  const bottomViewlets = viewlets.filter(v => v.position === 'bottom');

  const { activeViewlet, setActiveViewlet } = useUIStore((state) => ({
    activeViewlet: state.activeViewlet,
    setActiveViewlet: state.setActiveViewlet,
  }));

  const handleItemClick = (id: string) => {
    setActiveViewlet(id);
  };
  
  const renderViewlet = (viewlet: ViewletModule) => (
      <div
        key={viewlet.id}
        className={`activity-bar-item ${activeViewlet === viewlet.id ? 'active' : ''}`}
        title={viewlet.name}
        onClick={() => handleItemClick(viewlet.id)}
        role="button"
        aria-label={viewlet.name}
      >
        <viewlet.icon className="icon" />
      </div>
  );

  return (
    <nav className="activity-bar">
      <div className="activity-bar-top">
        {topViewlets.map(renderViewlet)}
      </div>
      <div className="activity-bar-bottom">
        {bottomViewlets.map(renderViewlet)}
      </div>
    </nav>
  );
};

export default ActivityBar;