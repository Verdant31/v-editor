import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import 'xterm/css/xterm.css';
import { terminalAtom } from '../../pages/Project/useProject';

export function useTerminal() {
  const [ terminalInstance, _ ] = useAtom(terminalAtom);
  const [ height, setHeight ] = useState(200);
  const [ isCollapsed, setIsCollapsed ] = useState(false);
  const [ previousHeight, setPreviousHeight ] = useState(200);

  useEffect(() => {
    terminalInstance?.resize(terminalInstance.cols, Math.floor(height/20));
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