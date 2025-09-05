// features/explorer/ExplorerView.tsx

import React from 'react';
import { useUIStore } from '../../store/uiStore';
import { fileService, FileSystemNode, FileNode as FileNodeType } from '../../services/fileService';

const FileNode: React.FC<{ node: FileSystemNode }> = ({ node }) => {
  const openTab = useUIStore((state) => state.openTab);

  if (node.type === 'file') {
    const handleOpenFile = () => {
      const fileNode = node as FileNodeType;
      openTab({ 
        id: fileNode.path, 
        title: fileNode.name, 
        content: fileNode.content 
      });
    };
    return (
      <li className="file" onClick={handleOpenFile}>
        📄 {node.name}
      </li>
    );
  }

  return (
    <li className="folder">
      📁 {node.name}
      <ul>
        {node.children.map(child => <FileNode key={child.path} node={child} />)}
      </ul>
    </li>
  );
};

const ExplorerView: React.FC = () => {
  const fileTree = fileService.getFileSystemTree();

  return (
    <div className="explorer-view">
      <ul>
        {fileTree.map(node => (
          <FileNode key={node.path} node={node} />
        ))}
      </ul>
    </div>
  );
};

export default ExplorerView;