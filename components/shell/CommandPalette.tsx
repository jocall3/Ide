// components/shell/CommandPalette.tsx

import React, { useState, useEffect, useRef } from 'react';
import { runtimeEngine } from '../../runtime/engine';
import { CommandModule } from '../../runtime/types';
import { useUIStore } from '../../store/uiStore';

const CommandPalette: React.FC = () => {
  const { toggleCommandPalette } = useUIStore();
  const allCommands = useRef(runtimeEngine.getCommands());
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCommands, setFilteredCommands] = useState<CommandModule[]>(allCommands.current);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const lowerCaseSearch = searchTerm.toLowerCase();
    const results = allCommands.current.filter(command =>
      command.title.toLowerCase().includes(lowerCaseSearch)
    );
    setFilteredCommands(results);
    setSelectedIndex(0); // Reset selection on new search
  }, [searchTerm]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        handleExecute(filteredCommands[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      toggleCommandPalette();
    }
  };

  const handleExecute = (command: CommandModule) => {
    command.handler();
    toggleCommandPalette();
  };

  return (
    <div className="command-palette-overlay" onClick={toggleCommandPalette}>
      <div className="command-palette" onClick={e => e.stopPropagation()} onKeyDown={handleKeyDown}>
        <input
          ref={inputRef}
          type="text"
          className="command-palette-input"
          placeholder="Type a command"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <ul className="command-palette-list">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((command, index) => (
              <li
                key={command.id}
                className={`command-palette-item ${index === selectedIndex ? 'selected' : ''}`}
                onClick={() => handleExecute(command)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                {command.title}
              </li>
            ))
          ) : (
            <li className="command-palette-item" style={{ cursor: 'default' }}>
              No commands found.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CommandPalette;