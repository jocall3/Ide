
// features/search/SearchView.tsx

import React, { useState, useEffect } from 'react';
import { useFileStore, SearchResult } from '../../store/fileStore';
import { useUIStore } from '../../store/uiStore';
import { FileIcon } from '../../assets/icons';

const SearchView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const searchFiles = useFileStore((state) => state.searchFiles);
  const openTab = useUIStore((state) => state.openTab);

  // Debounce search
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const handler = setTimeout(() => {
      setResults(searchFiles(query));
    }, 200);

    return () => {
      clearTimeout(handler);
    };
  }, [query, searchFiles]);

  const handleResultClick = (result: SearchResult) => {
    const file = useFileStore.getState().findNode(result.path);
    if (file && file.type === 'file') {
      openTab({
        id: file.path,
        title: file.name,
        content: file.content,
      });
    }
  };

  return (
    <div className="search-view">
      <input 
        type="text"
        placeholder="Search file content..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="search-results">
        {results.length > 0 && query.length > 1 && (
            <div style={{fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px'}}>
                Found {results.length} result(s)
            </div>
        )}
        {results.map((result, index) => (
          <div key={`${result.path}-${index}`} className="search-result-item" onClick={() => handleResultClick(result)}>
            <div className="search-result-file">
                <FileIcon className="icon" style={{width: 16}} />
                {result.fileName}
            </div>
            <div 
              className="search-result-snippet"
              dangerouslySetInnerHTML={{ __html: result.lineContent }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchView;
