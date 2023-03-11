import { atom, useAtom } from 'jotai';
import { useEffect } from "react";
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { startShell } from './projectFunctions';

export const terminalAtom = atom<Terminal | null>(null);
export const appUrlAtom = atom<string>('');

const fitAddon = new FitAddon();

export function useProject() {
  const [ terminalInstance, setTerminalInstance ] = useAtom(terminalAtom);
  const [ appUrl, setAppUrl ] = useAtom(appUrlAtom);

  const updateAppUrl = (url: string) => setAppUrl(url);
  
  useEffect(() => {
    if(!terminalInstance) {
      const terminal = new Terminal({
        convertEol: true,
        rows: 6,
        fontFamily: 'JetBrains Mono, monospace',
        theme: {
          blue: '#98db9f',
          magenta: '#98db9f',
          background: '#191622',
        },
      });
      terminal.loadAddon(fitAddon);
      fitAddon.fit();
      terminal.open(document.querySelector('.terminal') as HTMLElement);
      setTerminalInstance(terminal);
      return;
    }
    startShell(terminalInstance, updateAppUrl);
    
  }, [terminalInstance])

  return {
    appUrl,
    setAppUrl
  }
}