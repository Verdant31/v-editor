import { atom, useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import 'xterm/css/xterm.css';
import { terminalAtom } from '../../pages/Project/useProject';

export const terminalHeightAtom = atom(200)

export function useTerminal() {
  const [ terminalInstance, _ ] = useAtom(terminalAtom);
  const [ height, setHeight ] = useAtom(terminalHeightAtom);
  const [ isCollapsed, setIsCollapsed ] = useState(false);
  const [ previousHeight, setPreviousHeight ] = useState(200);

  useEffect(() => {
    terminalInstance?.resize(terminalInstance.cols, Math.floor(height/24));
  },[height])

  useEffect(() => {
    const terminalParent = document.getElementById('parent');
    if (isCollapsed) {
      setPreviousHeight(height);
      (terminalParent as any).style.display = 'none';
      setHeight(40);
      return;
    }
    (terminalParent as any).style.display = 'block';
    setHeight(previousHeight);
  },[isCollapsed])

  return {
    height,
    setHeight,
    isCollapsed,
    setIsCollapsed,
  }
}