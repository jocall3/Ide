
// components/shell/MainView.tsx

import React, { useEffect } from 'react';
import * as monaco from 'monaco-editor';
import { useUIStore } from '../../store/uiStore';
import { useFileStore } from '../../store/fileStore';
import { CloseIcon } from '../../assets/icons';
import Editor from '../ui/Editor';

const MainView: React.FC = () => {
  const { openTabs, activeTabId, setActiveTab, closeTab, setTabDirty, setTabClean } = useUIStore();
  const updateFileContent = useFileStore((state) => state.updateFileContent);

  const handleCloseTab = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation(); // Prevent click from bubbling to the tab itself
    closeTab(tabId);
  };

  const handleContentChange = (path: string, value: string) => {
    const tab = openTabs.find(t => t.id === path);
    // Only mark as dirty if content actually changed from its clean state
    if (tab && !tab.isDirty) {
        const file = useFileStore.getState().findNode(path);
        if (file && file.type === 'file' && file.content !== value) {
            setTabDirty(path);
        }
    }
  };
  
  // Effect for handling save shortcut (Cmd/Ctrl + S)
  useEffect(() => {
    const handleSave = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 's') {
            e.preventDefault();
            if (activeTabId) {
                const model = monaco.editor.getModel(monaco.Uri.parse(activeTabId));
                if (model) {
                    const newContent = model.getValue();
                    console.log(`[MainView] Saving file: ${activeTabId}`);
                    updateFileContent(activeTabId, newContent);
                    setTabClean(activeTabId);
                }
            }
        }
    };
    window.addEventListener('keydown', handleSave);
    return () => window.removeEventListener('keydown', handleSave);
  }, [activeTabId, updateFileContent, setTabClean]);


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
            <div className={`tab-dirty-indicator ${!tab.isDirty ? 'hidden' : ''}`} />
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
            onContentChange={handleContentChange}
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
