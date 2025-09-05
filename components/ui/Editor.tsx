
// components/ui/Editor.tsx

import React, { useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';

// Configure Monaco Editor to load its worker scripts from the CDN.
// This is the standard, robust way to set up workers when not using a bundler plugin.
// It resolves the CORS and "Script error" issues caused by the previous implementation.
(self as any).MonacoEnvironment = {
  getWorkerUrl: function (_moduleId: string, label: string) {
    // Note: The version here should match the version in the importmap.
    const CDN_BASE_URL = 'https://aistudiocdn.com/monaco-editor@^0.52.2/min';

    if (label === 'json') {
      return `${CDN_BASE_URL}/vs/language/json/json.worker.js`;
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return `${CDN_BASE_URL}/vs/language/css/css.worker.js`;
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return `${CDN_BASE_URL}/vs/language/html/html.worker.js`;
    }
    if (label === 'typescript' || label === 'javascript') {
      return `${CDN_BASE_URL}/vs/language/typescript/ts.worker.js`;
    }
    return `${CDN_BASE_URL}/vs/editor/editor.worker.js`;
  },
};

interface EditorProps {
  path: string;
  defaultValue: string;
  onContentChange?: (path: string, value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ path, defaultValue, onContentChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstance = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      const modelUri = monaco.Uri.parse(path);
      const model = monaco.editor.getModel(modelUri) || 
                    monaco.editor.createModel(defaultValue, undefined, modelUri);

      // If the model exists but has different content (e.g., file was updated), update it.
      if (model.getValue() !== defaultValue) {
        model.setValue(defaultValue);
      }
      
      editorInstance.current = monaco.editor.create(editorRef.current, {
        model: model,
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: { enabled: true },
      });

      // Listen for content changes to flag tabs as "dirty"
      const changeListener = editorInstance.current.onDidChangeModelContent(() => {
        if (onContentChange && editorInstance.current) {
          onContentChange(path, editorInstance.current.getValue());
        }
      });

      return () => {
        changeListener.dispose();
        editorInstance.current?.dispose();
      };
    }
  }, [path, defaultValue, onContentChange]);

  return <div className="editor-container" ref={editorRef} />;
};

export default Editor;
