import { useMemo, useEffect, useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { MonacoBinding } from 'y-monaco';
import { editor } from 'monaco-editor';
import { useRef } from 'react';
import { FunctionComponent } from 'react';
import { EditorProps as MonacoEditorProps } from '@monaco-editor/react';
import { Awareness } from 'y-protocols/awareness';
import * as monaco from 'monaco-editor';
import '../../styles.css'
import React from 'react';
import { YText } from 'yjs/dist/src/internals';
interface CursorsType {
  lineNumber: number,
  column: number
}
interface SelectionsType {
  startLineNumber: number,
  startColumn: number,
  endLineNumber: number,
  endColumn: number
}
export interface UsersType {
  cursor: {
    column?: number,
    lineNumber?: number
  },
  selection: {
    endColumn?: number, endLineNumber?: number, positionColumn?: number, positionLineNumber?: number, selectionStartColumn?: number, selectionStartLineNumber?: number, startColumn?: number, startLineNumber?: number
  },
  user: {
    color?: string, name?: string
  }
}
export const RealTimeMonaco: FunctionComponent<MonacoEditorProps & { name: string, roomId: string, color: string }> = ({
  ...props
}) => {
  const [allUsers, setAllUsers] = useState<UsersType[]>([])
  const [monacoEditor, setMonacoEditor] = useState<editor.IStandaloneCodeEditor>();
  const [awarenessElem, setAwareness] = useState<Awareness>();
  const editorRef = useRef<editor.IStandaloneCodeEditor>();
  const [myState, setMyState] = useState<{ name?: string; color?: string }>({
    name: props.name,
    color: props.color
  })
  const [isTrue, setIsTrue] = useState(false)
  const [colors, setColors] = useState<string[]>([])
  let decorations: string[] = []
  const [usersName, setUsersName] = useState<string[]>([])
  const [type2, setType2] = useState<YText | undefined>()
  const { name, color, collaborateId } = { name: props.name, color: props.color, collaborateId: props.roomId };
  useEffect(() => {
    if (!isTrue || !name) return;
    function decorateElement(element: HTMLElement, color: string, text: string) {
      const CursorDiv = document.createElement('div');
      CursorDiv.style.background = `#${color}`;
      CursorDiv.textContent = text;
      CursorDiv.setAttribute('class', 'cursor-hover');
      element.appendChild(CursorDiv);
    }
    function applyColorToElement(element: HTMLElement, color: string) {
      element.style.background = `#${color}`;
    }
    function processElements(elements: HTMLCollection, backgroundC: string, decorate: boolean) {
      for (let i = 0; i < elements.length; i++) {
        elements[i].className.split(' ').forEach((item: any) => {
          if (item.indexOf(backgroundC) !== -1) {
            const color = item.replace(backgroundC, '');
            if (myState?.color !== `#${color}`) {
              if (decorate && !elements[i].textContent) {
                const ind = allUsers.findIndex((elem: any) => elem.user?.color === `#${color}`);
                (elements[i] as HTMLElement).innerHTML = '';
                decorateElement(elements[i] as HTMLElement, color, allUsers[ind]?.user?.name ?? `#${color}`);
              } else {
                applyColorToElement(elements[i] as HTMLElement, color);
              }
            }
          }
        });
      }
    }
    const applyColorElements = document.getElementsByClassName('applyColorToThis');
    const myCursorElements = document.getElementsByClassName('my-cursor');
    const backgroundC = 'backgroundC-';
    processElements(applyColorElements, backgroundC, false);
    processElements(myCursorElements, backgroundC, true);
    const intervalId = setInterval(() => {
      processElements(applyColorElements, backgroundC, false);
      processElements(myCursorElements, backgroundC, true);
    }, 1);
    return () => clearInterval(intervalId);
  }, [allUsers, name]);
  const oncursorChange = (e: any) => {
    const position = e.position;
    const localState = awarenessElem?.getLocalState();
    awarenessElem?.setLocalState({
      ...localState,
      user: { name, color },
      cursor: position
    });
  }
  const onSelectionChange = (e: any) => {
    const selection = e.selection;
    let localState = awarenessElem?.getLocalState();
    localState = { ...localState, user: { name, color } }
    awarenessElem?.setLocalState({
      ...localState,
      user: { name, color },
      selection
    });
  }
  useEffect(() => {
    if (!monacoEditor) return;
    if (!isTrue) return;
    if (name) {
      monacoEditor?.onDidChangeCursorPosition(oncursorChange)
      monacoEditor?.onDidChangeCursorSelection(onSelectionChange);
    }
    if (awarenessElem) {
      awarenessElem.on('update', () => {
        const states = Array.from(awarenessElem.getStates().values()) as UsersType[];
        if (JSON.stringify(states) !== JSON.stringify(allUsers)) {
          // otherState.setState({ users: states });
          setAllUsers(states)
        }
      });
    }
  }, [monacoEditor, isTrue, name])
  function decorateCursors(newSelections: SelectionsType[], newCursors: CursorsType[], users: string[], editor: editor.IStandaloneCodeEditor) {
    const r: any = [];
    for (let p = 0; p < newCursors.length; p++) {
      const curr: CursorsType = newCursors[p];
      r.push({ range: new monaco.Range(curr.lineNumber, curr.column, curr.lineNumber, curr.column), options: { className: ` applyColorToThis ${myState?.color === users[p] ? '' : 'my-cursor'} backgroundC-${users[p]?.slice(1)}` } });
    }
    for (let p = 0; p < newSelections?.length; p++) {
      const curr: SelectionsType = newSelections[p];
      if (curr !== null) {
        r.push({
          range: new monaco.Range(curr.startLineNumber, curr.startColumn, curr.endLineNumber, curr.endColumn),
          options: {
            className: `${myState?.color === users[p] ? '' : 'applyColorToThis'} backgroundC-${users[p]?.slice(1)}`
          }
        }
        );
      }
    }
    decorations = editor?.deltaDecorations(decorations, r);
  }
  function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
    setIsTrue(true)
    editorRef.current = editor;
    const doc = new Y.Doc();
    const collaborateParam = collaborateId;
    const provider: WebsocketProvider = new WebsocketProvider('wss://demos.yjs.dev/ws', collaborateParam, doc);
    const type = doc.getText('monaco');
    setType2(type)
    const awareness = provider.awareness
    setAwareness(awareness);
    awareness.on('change', () => {
      const arr = Array.from(awareness.getStates().values());
      const newCursors: CursorsType[] = [];
      const newSelections: SelectionsType[] = [];
      let users: string[] = [];

      for (let i = 0; i < arr.length; i++) {
        const cursor = arr[i].cursor;
        const selection = arr[i].selection;
        const user = arr[i].user?.color;
        const name = arr[i].user?.name;
        if (cursor) {
          newCursors.push(cursor);
        }
        if (selection) {
          newSelections.push(selection);
        }
        users.push(user);
        setUsersName([...usersName, name])
      }
      users = [...users, ...users]
      decorateCursors(newSelections, newCursors, users, editor)
      setColors([...colors, ...users])
    })
    const model = editorRef.current?.getModel();
    if (model) {
      new MonacoBinding(type, model, new Set([editorRef.current]));
    }
  }
  useEffect(() => {
    if (!monacoEditor || !collaborateId || !name) {
      return
    }
    handleEditorDidMount(monacoEditor)
  }, [monacoEditor, collaborateId, name])
  const { onMount, value, ...rest } = props;
  useEffect(() => {
    if (monacoEditor && value && type2) {
      // type2.delete(0, type2.length);
      // type2.insert(0, value);
      monacoEditor.setValue("")
      monacoEditor.setValue(value)
    }
  }, [value, monacoEditor, type2])
  return (
    <MonacoEditor
      theme="vs-dark"
      onMount={(editor, monaco) => {
        setMonacoEditor(editor);
        if (onMount) {
          onMount(editor, monaco);
        }
      }}
      className='monaco-editor'
      {...rest}
    />
  );
};
