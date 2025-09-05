// features/extensions/ExtensionMaker.tsx

import React, { useState } from 'react';
import { extensionScaffolder } from './ExtensionScaffolder';

type Status = 'idle' | 'loading' | 'success' | 'error';

const ExtensionMaker: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setStatus('error');
      setMessage('Please enter a description for the extension.');
      return;
    }

    setStatus('loading');
    setMessage('Generating extension with AI...');

    try {
      const result = await extensionScaffolder.scaffoldFromPrompt(prompt);
      setStatus('success');
      setMessage(`Successfully created and loaded the "${result.featureName}" extension! Check the Activity Bar.`);
      setPrompt('');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'An unknown error occurred.');
      console.error(error);
    }
  };

  return (
    <div className="extension-maker">
      <label htmlFor="extension-prompt" className="extension-maker-label">
        Describe the extension you want to create:
      </label>
      <textarea
        id="extension-prompt"
        className="extension-maker-textarea"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g., a pomodoro timer with start, stop, and reset buttons"
        disabled={status === 'loading'}
      />
      <button
        className="extension-maker-button"
        onClick={handleGenerate}
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Generating...' : 'Generate Extension'}
      </button>

      {status !== 'idle' && (
        <div className={`extension-maker-status ${status}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default ExtensionMaker;