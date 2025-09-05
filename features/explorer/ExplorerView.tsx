

// features/explorer/ExplorerView.tsx

import React, { useState, useEffect, useRef } from 'react';
import { useUIStore } from '../../store/uiStore';
import { useFileStore, FileSystemNode as FSTreeNode, FileNode as FileNodeType, FolderNode } from '../../store/fileStore';
import { NewFileIcon, NewFolderIcon, FileIcon, FolderIcon } from '../../assets/icons';
import ContextMenu from '../../components/ui/ContextMenu';

type ContextMenuState = {
  visible: boolean;
  x: number;
  y: number;
  node: FSTreeNode | null;
};

const NodeInput: React.FC<{ parentPath: string; type: 'file' | 'folder'; onCancel: () => void; }> = ({ parentPath, type, onCancel }) => {
    const [name, setName] = useState('');
    const { addNode } = useFileStore();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            addNode(parentPath, name.trim(), type);
        }
        onCancel();
    };

    return (
        <form onSubmit={handleSubmit} style={{ paddingLeft: parentPath === '/' ? '0' : '16px' }}>
            <li>
                {type === 'file' ? <FileIcon className="icon" style={{width: 16}} /> : <FolderIcon className="icon" style={{width: 16}} />}
                <input
                    ref={inputRef}
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    onBlur={onCancel}
                    onKeyDown={e => e.key === 'Escape' && onCancel()}
                    className="explorer-node-input"
                    placeholder={`Enter ${type} name...`}
                />
            </li>
        </form>
    );
};

// FIX: Refactored FileSystemNode to use state lifted to ExplorerView for renaming.
const FileSystemNode: React.FC<{
  node: FSTreeNode;
  depth: number;
  renamingPath: string | null;
  setRenamingPath: (path: string | null) => void;
}> = ({ node, depth, renamingPath, setRenamingPath }) => {
  const openTab = useUIStore((state) => state.openTab);
  const { renameNode } = useFileStore();
  const [newName, setNewName] = useState(node.name);
  const isRenaming = renamingPath === node.path;

  const handleOpenFile = () => {
    if (node.type === 'file') {
      const fileNode = node as FileNodeType;
      openTab({
        id: fileNode.path,
        title: fileNode.name,
        content: fileNode.content,
      });
    }
  };

  const handleRenameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim() && newName.trim() !== node.name) {
      renameNode(node.path, newName.trim());
    }
    setRenamingPath(null);
  };

  useEffect(() => {
    // Reset input value if renaming is cancelled
    if (!isRenaming) {
      setNewName(node.name);
    }
  }, [isRenaming, node.name]);

  const renderNodeName = () => {
    if (isRenaming) {
      return (
        <form onSubmit={handleRenameSubmit}>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={() => setRenamingPath(null)}
            onKeyDown={(e) => e.key === 'Escape' && setRenamingPath(null)}
            autoFocus
            className="explorer-node-input"
          />
        </form>
      );
    }
    // Allow renaming on double click
    return (
      <span onClick={handleOpenFile} onDoubleClick={() => setRenamingPath(node.path)}>
        {node.name}
      </span>
    );
  };

  if (node.type === 'file') {
    return (
      <li className="file-entry" data-path={node.path}>
        <FileIcon className="icon" style={{width: 16}} /> {renderNodeName()}
      </li>
    );
  }

  return (
    <li className="folder">
      <div className="file-entry" data-path={node.path}>
        <FolderIcon className="icon" style={{width: 16}} /> {renderNodeName()}
      </div>
      {!isRenaming && (
        <ul>
          {(node as FolderNode).children.map((child) => (
            <FileSystemNode
              key={child.path}
              node={child}
              depth={depth + 1}
              renamingPath={renamingPath}
              setRenamingPath={setRenamingPath}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

const ExplorerView: React.FC = () => {
  const fileTree = useFileStore((state) => state.fileSystemTree);
  const { deleteNode } = useFileStore();
  const [isCreating, setIsCreating] = useState<'file' | 'folder' | null>(null);
  // FIX: Lifted renaming state to the parent component for robust state management.
  const [renamingPath, setRenamingPath] = useState<string | null>(null);

  const [contextMenu, setContextMenu] = useState<ContextMenuState>({ visible: false, x: 0, y: 0, node: null });
  const explorerRef = useRef<HTMLDivElement>(null);
  
  const handleContextMenu = (e: React.MouseEvent) => {
      e.preventDefault();
      const target = (e.target as HTMLElement).closest('.file-entry');
      if (target && target instanceof HTMLElement) {
          const path = target.dataset.path;
          if (path) {
              const node = useFileStore.getState().findNode(path);
              setContextMenu({ visible: true, x: e.clientX, y: e.clientY, node });
          }
      }
  };
  
  const closeContextMenu = () => setContextMenu(c => ({ ...c, visible: false }));

  // FIX: Removed broken and unused handleRename and findReactComponent functions.
  
  return (
    <>
      <div className="side-panel-header">
        <span>Explorer</span>
        <div className="side-panel-actions">
            <button className="side-panel-action-btn" title="New File" onClick={() => setIsCreating('file')}>
                <NewFileIcon className="icon" style={{width: 16}} />
            </button>
            <button className="side-panel-action-btn" title="New Folder" onClick={() => setIsCreating('folder')}>
                <NewFolderIcon className="icon" style={{width: 16}} />
            </button>
        </div>
      </div>
      <div className="explorer-view" ref={explorerRef} onContextMenu={handleContextMenu} onClick={closeContextMenu}>
        {isCreating && <NodeInput parentPath="/" type={isCreating} onCancel={() => setIsCreating(null)} />}
        <ul>
          {fileTree.map(node => (
            <FileSystemNode 
              key={node.path} 
              node={node} 
              depth={0}
              renamingPath={renamingPath}
              setRenamingPath={setRenamingPath}
             />
          ))}
        </ul>
      </div>
      {contextMenu.visible && contextMenu.node && (
          <ContextMenu x={contextMenu.x} y={contextMenu.y} onClose={closeContextMenu}>
            {/* FIX: Implemented rename functionality in context menu. */}
            <button className="context-menu-item" onClick={() => {
                if (contextMenu.node) {
                    setRenamingPath(contextMenu.node.path);
                }
                closeContextMenu();
            }}>
                Rename
            </button>
            <button className="context-menu-item" onClick={() => {
                if (window.confirm(`Are you sure you want to delete ${contextMenu.node?.name}?`)) {
                    deleteNode(contextMenu.node!.path);
                }
                closeContextMenu();
            }}>
                Delete
            </button>
          </ContextMenu>
      )}
    </>
  );
};

export default ExplorerView;