// features/extensions/ExtensionsView.tsx

import React, { useState } from 'react';
import ExtensionMaker from './ExtensionMaker';

const ExtensionsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('create');

  return (
    <div className="extensions-view">
      <div className="extensions-view-tabs">
        <div 
          className={`extensions-view-tab ${activeTab === 'market' ? 'active' : ''}`}
          onClick={() => setActiveTab('market')}
        >
          Marketplace
        </div>
        <div 
          className={`extensions-view-tab ${activeTab === 'create' ? 'active' : ''}`}
          onClick={() => setActiveTab('create')}
        >
          Create New
        </div>
      </div>
      <div className="extensions-view-content">
        {activeTab === 'market' && <p style={{padding: '0 8px'}}>Browse and install extensions (coming soon).</p>}
        {activeTab === 'create' && <ExtensionMaker />}
      </div>
    </div>
  );
};

export default ExtensionsView;