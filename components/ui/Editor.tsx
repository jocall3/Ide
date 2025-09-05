// components/ui/Editor.tsx

import React, { useRef, useEffect } from 'react';
import * as monaco from 'monaco-editor';

// Since we are using a CDN, the worker needs to be configured.
// This is a common setup for using monaco-editor without a build tool like Webpack.
(self as any).MonacoEnvironment = {
  getWorker: function (_moduleId: any, label: string) {
    const getWorkerModule = (moduleUrl: string, label: string) => {
      return new Worker(URL.createObjectURL(new Blob([`
        self.MonacoEnvironment = {
          baseUrl: 'https://aistudiocdn.com/monaco-editor@^0.49.0/min/'
        };
        importScripts('https://aistudiocdn.com/monaco-editor@^0.49.0/min/vs/base/worker/workerMain.js');
      `], { type: 'application/javascript' })));
    };

    if (label === 'json') {
      return getWorkerModule('/vs/language/json/json.worker.js', label);
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return getWorkerModule('/vs/language/css/css.worker.js', label);
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return getWorkerModule('/vs/language/html/html.worker.js', label);
    }
    if (label === 'typescript' || label === 'javascript') {
      return getWorkerModule('/vs/language/typescript/ts.worker.js', label);
    }
    return getWorkerModule('/vs/editor/editor.worker.js', label);
  },
};

interface EditorProps {
  path: string;
  defaultValue: string;
}

const Editor: React.FC<EditorProps> = ({ path, defaultValue }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstance = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      const model = monaco.editor.getModel(monaco.Uri.parse(path)) || 
                    monaco.editor.createModel(defaultValue, undefined, monaco.Uri.parse(path));

      editorInstance.current = monaco.editor.create(editorRef.current, {
        model: model,
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: { enabled: true },
      });
    }

    return () => {
      editorInstance.current?.dispose();
    };
  }, [path, defaultValue]);

  return <div className="editor-container" ref={editorRef} />;
};

export default Editor;