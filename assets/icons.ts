// assets/icons.ts

import React from 'react';
import Icon from '../components/ui/Icon';

export const DashboardIcon: React.FC<{ className?: string }> = ({ className }) => (
  React.createElement(Icon, {
    className,
    children: [
        React.createElement('path', { key: 1, d: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" })
    ]
  })
);

export const AuthIcon: React.FC<{ className?: string }> = ({ className }) => (
    React.createElement(Icon, {
      className,
      children: [
          React.createElement('path', { key: 1, d: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" })
      ]
    })
);

// FIX: Replaced JSX with React.createElement to be compatible with .ts files.
export const FilesIcon: React.FC<{ className?: string }> = ({ className }) => (
  // FIX: Pass children as a prop to satisfy the Icon component's required 'children' prop type.
  React.createElement(Icon, {
    className,
    children: [
      React.createElement('path', { key: 1, d: "M7 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-6-6H7z", fillOpacity: "0.5" }),
      React.createElement('path', { key: 2, d: "M13 2v6h6L13 2z" })
    ]
  })
);

// FIX: Replaced JSX with React.createElement to be compatible with .ts files.
export const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
  // FIX: Pass children as a prop to satisfy the Icon component's required 'children' prop type.
  React.createElement(Icon, {
    className,
    children: React.createElement('path', { d: "M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" })
  })
);

// FIX: Replaced JSX with React.createElement to be compatible with .ts files.
export const SettingsIcon: React.FC<{ className?: string }> = ({ className }) => (
  // FIX: Pass children as a prop to satisfy the Icon component's required 'children' prop type.
  React.createElement(Icon, {
    className,
    children: React.createElement('path', { d: "M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" })
  })
);

// FIX: Replaced JSX with React.createElement to be compatible with .ts files.
export const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  // FIX: Pass children as a prop to satisfy the Icon component's required 'children' prop type.
  React.createElement(Icon, {
    className,
    viewBox: "0 0 16 16",
    strokeWidth: "2",
    stroke: "currentColor",
    fill: "none",
    children: React.createElement('path', { d: "M4 4L12 12M12 4L4 12" })
  })
);

export const ExtensionsIcon: React.FC<{ className?: string }> = ({ className }) => (
  React.createElement(Icon, {
    className,
    children: React.createElement('path', { d: "M20 7l-1.41-1.41L13 11.17V4h-2v7.17L5.41 5.59 4 7l8 8 8-8z" })
  })
);

export const NotesIcon: React.FC<{ className?: string }> = ({ className }) => (
  React.createElement(Icon, {
    className,
    children: React.createElement('path', { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" })
  })
);
