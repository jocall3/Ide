
// store/fileStore.ts
import { create } from 'zustand';

// Type definitions
export type FileSystemNode = FileNode | FolderNode;

export interface FileNode {
  type: 'file';
  name: string;
  path: string;
  content: string;
}

export interface FolderNode {
  type: 'folder';
  name: string;
  path: string;
  children: FileSystemNode[];
}

export interface SearchResult {
    path: string;
    fileName: string;
    lineContent: string; // The line with the match, with <mark> tags
}


// Helper functions (could be moved to a separate utility file)
const findNodeRecursive = (nodes: FileSystemNode[], path: string): FileSystemNode | null => {
  for (const node of nodes) {
    if (node.path === path) return node;
    if (node.type === 'folder') {
      const found = findNodeRecursive(node.children, path);
      if (found) return found;
    }
  }
  return null;
};

const removeNodeRecursive = (nodes: FileSystemNode[], path: string): FileSystemNode[] => {
  return nodes.filter(node => node.path !== path).map(node => {
    if (node.type === 'folder') {
      return { ...node, children: removeNodeRecursive(node.children, path) };
    }
    return node;
  });
};

const addNodeRecursive = (nodes: FileSystemNode[], parentPath: string, newNode: FileSystemNode): FileSystemNode[] => {
    if (parentPath === '/') {
        return [...nodes, newNode];
    }
    return nodes.map(node => {
        if (node.type === 'folder') {
            if (node.path === parentPath) {
                return { ...node, children: [...node.children, newNode] };
            }
            return { ...node, children: addNodeRecursive(node.children, parentPath, newNode) };
        }
        return node;
    });
};

const renameNodeRecursive = (nodes: FileSystemNode[], path: string, newName: string): FileSystemNode[] => {
    // This is complex because child paths also need updating.
    // A simpler implementation for this exercise might be to rebuild paths on the fly.
    // For now, we will just rename the node itself. A robust solution would need more logic.
    return nodes.map(node => {
        if (node.path === path) {
            // Path needs to be updated. e.g., /src/old.ts -> /src/new.ts
            const pathParts = node.path.split('/');
            pathParts[pathParts.length - 1] = newName;
            const newPath = pathParts.join('/');
            console.warn(`[FileStore] Renaming is simplified. Child paths not updated for folders.`);
            return { ...node, name: newName, path: newPath };
        }
        if (node.type === 'folder') {
            return { ...node, children: renameNodeRecursive(node.children, path, newName) };
        }
        return node;
    });
}

const updateFileContentRecursive = (nodes: FileSystemNode[], path: string, content: string): FileSystemNode[] => {
    return nodes.map(node => {
        if (node.path === path && node.type === 'file') {
            return { ...node, content };
        }
        if (node.type === 'folder') {
            return { ...node, children: updateFileContentRecursive(node.children, path, content) };
        }
        return node;
    });
}

const searchFilesRecursive = (nodes: FileSystemNode[], query: string, results: SearchResult[]) => {
    const regex = new RegExp(query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'gi');
    for(const node of nodes) {
        if(node.type === 'file') {
            const lines = node.content.split('\n');
            lines.forEach((line, index) => {
                if (regex.test(line)) {
                    results.push({
                        path: node.path,
                        fileName: node.name,
                        lineContent: line.trim().replace(regex, (match) => `<mark>${match}</mark>`),
                    });
                }
            });
        } else if (node.type === 'folder') {
            searchFilesRecursive(node.children, query, results);
        }
    }
}


// Store Definition
interface FileState {
  fileSystemTree: FileSystemNode[];
  findNode: (path: string) => FileSystemNode | null;
  addNode: (parentPath: string, name: string, type: 'file' | 'folder') => void;
  deleteNode: (path: string) => void;
  renameNode: (path: string, newName: string) => void;
  updateFileContent: (path: string, content: string) => void;
  searchFiles: (query: string) => SearchResult[];
}

const initialFileSystem: FileSystemNode[] = [
    { type: 'file', name: 'README.md', path: '/README.md', content: '# My Awesome IDE\n\nThis is a scalable application shell built with React and TypeScript.' },
    {
        type: 'folder', name: 'src', path: '/src', children: [
            { type: 'file', name: 'index.tsx', path: '/src/index.tsx', content: 'import React from "react";\nimport ReactDOM from "react-dom";\n\nReactDOM.render(<App />, document.getElementById("root"));' },
            { type: 'folder', name: 'components', path: '/src/components', children: [
                { type: 'file', name: 'Button.tsx', path: '/src/components/Button.tsx', content: 'export const Button = () => <button>Click Me</button>;' },
            ]}
        ]
    }
];

export const useFileStore = create<FileState>((set, get) => ({
  fileSystemTree: initialFileSystem,

  findNode: (path) => {
    return findNodeRecursive(get().fileSystemTree, path);
  },

  addNode: (parentPath, name, type) => {
    const parentNode = parentPath === '/' ? null : get().findNode(parentPath);
    if (parentPath !== '/' && (!parentNode || parentNode.type !== 'folder')) {
        console.error(`[FileStore] Parent path "${parentPath}" not found or is not a folder.`);
        return;
    }
    
    const newPath = `${parentPath === '/' ? '' : parentPath}/${name}`;
    
    if (get().findNode(newPath)) {
        alert(`A file or folder named "${name}" already exists in this directory.`);
        return;
    }

    const newNode: FileSystemNode = type === 'file'
      ? { type: 'file', path: newPath, name, content: '' }
      : { type: 'folder', path: newPath, name, children: [] };
    
    set(state => ({
        fileSystemTree: addNodeRecursive(state.fileSystemTree, parentPath, newNode)
    }));
  },

  deleteNode: (path) => {
    set(state => ({
      fileSystemTree: removeNodeRecursive(state.fileSystemTree, path),
    }));
  },

  renameNode: (path, newName) => {
    set(state => ({
        fileSystemTree: renameNodeRecursive(state.fileSystemTree, path, newName)
    }));
  },
  
  updateFileContent: (path, content) => {
    set(state => ({
        fileSystemTree: updateFileContentRecursive(state.fileSystemTree, path, content)
    }))
  },
  
  searchFiles: (query) => {
    const results: SearchResult[] = [];
    searchFilesRecursive(get().fileSystemTree, query, results);
    return results;
  }
}));
