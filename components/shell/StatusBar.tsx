// components/shell/StatusBar.tsx

import React, { useState, useEffect } from 'react';
import { runtimeEngine } from '../../runtime/engine';
import { WidgetModule } from '../../runtime/types';

const StatusBar: React.FC = () => {
  const [widgets, setWidgets] = useState<WidgetModule[]>([]);

  useEffect(() => {
    setWidgets(runtimeEngine.getWidgets());
  }, []);

  const leftWidgets = widgets.filter(w => w.alignment === 'left');
  const rightWidgets = widgets.filter(w => w.alignment === 'right');

  return (
    <footer className="status-bar">
      <div className="status-bar-left">
        {leftWidgets.map(widget => (
          <widget.component key={widget.id} />
        ))}
         {/* Default content if no widgets */}
        {leftWidgets.length === 0 && <div>Ready</div>}
      </div>
      <div className="status-bar-right">
         {/* Default content if no widgets */}
        {rightWidgets.length === 0 && <div>Cmd/Ctrl + K for Commands</div>}
        {rightWidgets.map(widget => (
          <widget.component key={widget.id} />
        ))}
      </div>
    </footer>
  );
};

export default StatusBar;