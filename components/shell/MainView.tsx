// components/shell/MainView.tsx

import React from 'react';
import { useUIStore } from '../../store/uiStore';
import { CloseIcon } from '../../assets/icons';
import Editor from '../ui/Editor';

const MainView: React.FC = () => {
  const { openTabs, activeTabId, setActiveTab, closeTab } = useUIStore(
    (state) => ({
      openTabs: state.openTabs,
      activeTabId: state.activeTabId,
      setActiveTab: state.setActiveTab,
      closeTab: state.closeTab,
    })
  );

  const handleCloseTab = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation(); // Prevent click from bubbling to the tab itself
    closeTab(tabId);
  };

  const activeTab = openTabs.find(tab => tab.id === activeTabId);

  return (
    <section className="main-view">
      <div className="main-view-tabs">
        {openTabs.map((tab) => (
          <div
            key={tab.id}
            className={`main-view-tab ${tab.id === activeTabId ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span>{tab.title}</span>
            <button 
              className="tab-close-btn" 
              onClick={(e) => handleCloseTab(e, tab.id)}
              aria-label={`Close ${tab.title}`}
            >
              <CloseIcon />
            </button>
          </div>
        ))}
      </div>
      <div className="main-view-content">
        {activeTab ? (
          <Editor
            key={activeTab.id}
            path={activeTab.id}
            defaultValue={activeTab.content}
          />
        ) : (
          <div style={{ padding: '1rem' }}>
            <h1>Welcome to Your New IDE</h1>
            <p>Select a file from the explorer to begin editing, or press <strong>Cmd/Ctrl + K</strong> to open the Command Palette.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MainView;