// services/fileService.ts

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

// Start with a mutable copy of the initial state
let fileSystemTree: FileSystemNode[] = [
  {
    type: 'folder',
    name: 'src',
    path: '/src',
    children: [
      {
        type: 'folder',
        name: 'components',
        path: '/src/components',
        children: [
          { type: 'file', name: 'Button.tsx', path: '/src/components/Button.tsx', content: 'export const Button = () => <button>Click Me</button>;' },
          { type: 'file', name: 'Modal.tsx', path: '/src/components/Modal.tsx', content: 'export const Modal = () => <div>Modal Content</div>;' },
        ],
      },
      {
        type: 'folder',
        name: 'hooks',
        path: '/src/hooks',
        children: [
            { type: 'file', name: 'useDebounce.ts', path: '/src/hooks/useDebounce.ts', content: '// Debounce hook implementation...' },
        ],
      },
      { type: 'file', name: 'index.tsx', path: '/src/index.tsx', content: 'import React from "react";\nimport ReactDOM from "react-dom";\n\nReactDOM.render(<App />, document.getElementById("root"));' },
    ],
  },
  { type: 'file', name: 'package.json', path: '/package.json', content: '{\n  "name": "my-app",\n  "version": "0.1.0"\n}' },
  { type: 'file', name: 'README.md', path: '/README.md', content: '# My Awesome IDE\n\nThis is a scalable application shell built with React and TypeScript.' },
];

class FileService {
  getFileSystemTree(): FileSystemNode[] {
    return fileSystemTree;
  }

  writeFile(path: string, content: string): void {
    console.log(`[FileService] Writing file to ${path}`);
    const pathSegments = path.split('/').filter(p => p);
    const fileName = pathSegments.pop();

    if (!fileName) {
      console.error(`[FileService] Invalid file path: ${path}`);
      return;
    }

    let currentLevel: FileSystemNode[] = fileSystemTree;
    let currentPath = '';

    for (const segment of pathSegments) {
      currentPath += `/${segment}`;
      let folderNode = currentLevel.find(node => node.path === currentPath) as FolderNode;

      if (!folderNode) {
        folderNode = {
          type: 'folder',
          name: segment,
          path: currentPath,
          children: [],
        };
        currentLevel.push(folderNode);
        console.log(`[FileService] Created directory: ${currentPath}`);
      }
      
      if (folderNode.type !== 'folder') {
        console.error(`[FileService] Conflict: Path segment is a file, not a directory: ${currentPath}`);
        return;
      }

      currentLevel = folderNode.children;
    }

    // Check if file already exists and update it, otherwise create it
    const existingFile = currentLevel.find(node => node.name === fileName && node.type === 'file') as FileNode;
    if (existingFile) {
        existingFile.content = content;
        console.log(`[FileService] Updated file: ${path}`);
    } else {
        currentLevel.push({
          type: 'file',
          name: fileName,
          path: path,
          content: content,
        });
        console.log(`[FileService] Created file: ${path}`);
    }
  }
}

export const fileService = new FileService();