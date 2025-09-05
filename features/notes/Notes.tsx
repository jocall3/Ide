// features/notes/Notes.tsx
import React, { useState } from 'react';

const NotesView: React.FC = () => {
  const [notes, setNotes] = useState<string[]>(['Welcome to Notes!']);
  const [newNote, setNewNote] = useState('');

  const handleAddNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, newNote.trim()]);
      setNewNote('');
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddNote();
    }
  }

  return (
    <div style={{ padding: '8px', display: 'flex', flexDirection: 'column', height: 'calc(100% - 16px)' }}>
      <div style={{ flexGrow: 1, overflowY: 'auto' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {notes.map((note, index) => (
            <li key={index} style={{ background: 'var(--background-tertiary)', padding: '8px', borderRadius: '4px', marginBottom: '8px', color: 'var(--text-secondary)' }}>
              {note}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="New note..."
          style={{ flexGrow: 1, padding: '8px', background: 'var(--background-primary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: '4px' }}
        />
        <button
          onClick={handleAddNote}
          style={{ background: 'var(--accent-color)', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default NotesView;
