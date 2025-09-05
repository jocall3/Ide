import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/layout/App';
import './index.css';
import { runtimeEngine } from './runtime/engine';

// Initialize the runtime engine before rendering the application.
// This discovers and registers all statically defined modules.
runtimeEngine.initialize();

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Failed to find the root element');
}