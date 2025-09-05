// features/extensions/ExtensionAIService.ts

const MOCK_COMPONENT_CONTENT = `
import React, { useState } from 'react';

const SimpleCounter = () => {
  const [count, setCount] = useState(0);

  const buttonStyle = {
    backgroundColor: 'var(--accent-color)',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '4px',
  };

  const containerStyle = {
    padding: '16px',
    textAlign: 'center',
    color: 'var(--text-primary)'
  };

  return (
    <div style={containerStyle}>
      <h3>Counter Extension</h3>
      <p style={{ fontSize: '2rem', margin: '1rem 0' }}>{count}</p>
      <div>
        <button style={buttonStyle} onClick={() => setCount(c => c - 1)}>-1</button>
        <button style={buttonStyle} onClick={() => setCount(c => c + 1)}>+1</button>
      </div>
    </div>
  );
};

export default SimpleCounter;
`;


class ExtensionAIService {
  /**
   * Mocks the generation of an extension by returning a hardcoded counter component.
   * This removes the dependency on the GenAI API and API keys.
   * @param prompt The user's prompt (ignored in this mock implementation).
   * @returns A promise that resolves with the metadata for the new component.
   */
  async generateExtension(prompt: string): Promise<any> {
    console.log('[AIService] MOCK generating extension for prompt:', prompt);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 750));
    
    const featureName = `simpleCounter${Date.now()}`;

    const mockResponse = {
        featureName: featureName,
        componentName: 'SimpleCounter',
        viewletName: 'Counter',
        viewletIcon: '🔢',
        componentContent: MOCK_COMPONENT_CONTENT,
    };
    
    console.log('[AIService] MOCK generation complete.');
    return mockResponse;
  }
}

export const extensionAIService = new ExtensionAIService();
