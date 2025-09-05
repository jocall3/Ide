// components/shell/Shell.tsx

import React, { useEffect } from 'react';
import { useUIStore } from '../../store/uiStore';
import ActivityBar from './ActivityBar';
import SidePanel from './SidePanel';
import MainView from './MainView';
import StatusBar from './StatusBar';
import CommandPalette from './CommandPalette';

const Shell: React.FC = () => {
  const { isSidePanelVisible, isCommandPaletteOpen, toggleCommandPalette } = useUIStore((state) => ({
      isSidePanelVisible: state.isSidePanelVisible,
      isCommandPaletteOpen: state.isCommandPaletteOpen,
      toggleCommandPalette: state.toggleCommandPalette
  }));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleCommandPalette();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleCommandPalette]);

  return (
    <>
      <div className="shell-container">
        <div className="shell-main">
          <ActivityBar />
          {isSidePanelVisible && <SidePanel />}
          <div className="shell-content">
            <MainView />
          </div>
        </div>
        <StatusBar />
      </div>
      {isCommandPaletteOpen && <CommandPalette />}
    </>
  );
};

export default Shell;