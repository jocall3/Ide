// components/shell/SidePanel.tsx

import React from 'react';
import { runtimeEngine } from '../../runtime/engine';
import { useUIStore } from '../../store/uiStore';
import { ViewletModule } from '../../runtime/types';

const SidePanel: React.FC = () => {
  const activeViewletId = useUIStore((state) => state.activeViewlet);
  
  if (!activeViewletId) {
    return null;
  }

  const activeViewlet = runtimeEngine
    .getModules<ViewletModule>('VIEWLET')
    .find((v) => v.id === activeViewletId);

  if (!activeViewlet) {
    return (
      <aside className="side-panel">
        <div className="side-panel-header">Error</div>
        <p>Active viewlet '{activeViewletId}' not found.</p>
      </aside>
    );
  }

  const ViewComponent = activeViewlet.component;

  return (
    <aside className="side-panel">
      <div className="side-panel-header">{activeViewlet.name}</div>
      <ViewComponent />
    </aside>
  );
};

export default SidePanel;
