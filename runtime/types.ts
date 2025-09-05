// runtime/types.ts

import React from 'react';

/**
 * Defines a module that contributes an icon to the Activity Bar and a
 * corresponding view component to the Side Panel.
 */
export interface ViewletModule {
  type: 'VIEWLET';
  id: string; // Unique identifier (e.g., 'explorer', 'search')
  name: string; // Display name for tooltips
  icon: React.ComponentType<{ className?: string }>;
  component: React.ComponentType;
  position: 'top' | 'bottom'; // Where to render in the Activity Bar
}

/**
 * Defines a command that can be executed, typically from the Command Palette.
 */
export interface CommandModule {
  type: 'COMMAND';
  id: string; // Unique identifier (e.g., 'theme.toggle')
  title: string; // User-facing title for the command palette
  handler: () => void; // The function to execute
}

/**
 * Defines a module that contributes a component to the Status Bar.
 */
export interface WidgetModule {
  type: 'WIDGET';
  id: string; // Unique identifier (e.g., 'system.status')
  component: React.ComponentType;
  alignment: 'left' | 'right'; // Which side of the status bar to render on
}


// A union of all possible module types the runtime engine can handle.
export type AppModule = ViewletModule | CommandModule | WidgetModule;

// The function signature for a module's registration file.
export type RegisterFunction = () => AppModule;