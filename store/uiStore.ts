// store/uiStore.ts

import { create } from 'zustand';

interface Tab {
  id: string; // Unique identifier, e.g., file path
  title: string; // Display title, e.g., file name
  content: string; // The file content to be displayed in the editor
}

interface UIState {
  activeViewlet: string | null;
  isSidePanelVisible: boolean;
  openTabs: Tab[];
  activeTabId: string | null;
  isCommandPaletteOpen: boolean;
  modulesVersion: number; // Used to trigger re-renders when modules change
  
  // Actions
  setActiveViewlet: (viewletId: string | null) => void;
  openTab: (tab: Tab) => void;
  closeTab: (tabId: string) => void;
  setActiveTab: (tabId: string) => void;
  toggleCommandPalette: () => void;
  incrementModulesVersion: () => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  activeViewlet: 'dashboard', // Default to dashboard
  isSidePanelVisible: true,
  openTabs: [],
  activeTabId: null,
  isCommandPaletteOpen: false,
  modulesVersion: 0,

  setActiveViewlet: (viewletId) => {
    const { activeViewlet, isSidePanelVisible } = get();
    // If clicking the same active viewlet, toggle the panel
    if (viewletId === activeViewlet) {
      set({ isSidePanelVisible: !isSidePanelVisible });
    } else {
      set({ activeViewlet: viewletId, isSidePanelVisible: true });
    }
  },

  openTab: (tab) => {
    const { openTabs } = get();
    // If tab is already open, just make it active
    if (openTabs.some(t => t.id === tab.id)) {
      set({ activeTabId: tab.id });
    } else {
      set(state => ({
        openTabs: [...state.openTabs, tab],
        activeTabId: tab.id,
      }));
    }
  },

  closeTab: (tabId) => {
    set(state => {
      const newTabs = state.openTabs.filter(t => t.id !== tabId);
      let newActiveTabId = state.activeTabId;

      // If the closed tab was the active one, find a new active tab
      if (state.activeTabId === tabId) {
        const closedTabIndex = state.openTabs.findIndex(t => t.id === tabId);
        // If there's a tab after, make it active. Otherwise, make the previous one active.
        if (newTabs.length > 0) {
          newActiveTabId = newTabs[Math.min(closedTabIndex, newTabs.length - 1)].id;
        } else {
          newActiveTabId = null;
        }
      }

      return {
        openTabs: newTabs,
        activeTabId: newActiveTabId,
      };
    });
  },
  
  setActiveTab: (tabId) => {
    set({ activeTabId: tabId });
  },

  toggleCommandPalette: () => {
    set(state => ({ isCommandPaletteOpen: !state.isCommandPaletteOpen }));
  },

  incrementModulesVersion: () => {
    set(state => ({ modulesVersion: state.modulesVersion + 1 }));
  }
}));
