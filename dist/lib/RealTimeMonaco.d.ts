import { FunctionComponent } from 'react';
import { EditorProps as MonacoEditorProps } from '@monaco-editor/react';
import './styles.css';
export interface UsersType {
    cursor: {
        column?: number;
        lineNumber?: number;
    };
    selection: {
        endColumn?: number;
        endLineNumber?: number;
        positionColumn?: number;
        positionLineNumber?: number;
        selectionStartColumn?: number;
        selectionStartLineNumber?: number;
        startColumn?: number;
        startLineNumber?: number;
    };
    user: {
        color?: string;
        name?: string;
    };
}
export declare const RealTimeMonaco: FunctionComponent<MonacoEditorProps & {
    name: string;
    roomId: string;
    color: string;
    language: string;
    DefaultValue?: string;
}>;
