import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import 'xterm/css/xterm.css';
import { terminalAtom } from '../../pages/Project/useProject';

export function useTerminal() {
  const [ terminalInstance, _ ] = useAtom(terminalAtom);
  const [ height, setHeight ] = useState(200);

  useEffect(() => {
    terminalInstance?.resize(terminalInstance.cols, Math.floor(height/20));
  },[height])

  return {
    height,
    setHeight,
  }
}