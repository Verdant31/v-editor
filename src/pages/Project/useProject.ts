import { atom, useAtom } from 'jotai';
import { useEffect } from "react";
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { CurrentFile } from '../../components/File/useFile';
import { startShell } from './projectFunctions';

export interface OpenedFile extends CurrentFile {
  isCurrent: boolean;
  isDirty: boolean;
  unsaved?: boolean;
  initialCode: string;
}

export const terminalAtom = atom<Terminal | null>(null);
export const appUrlAtom = atom<string>('');
export const openedFilesAtom = atom<OpenedFile[]>([])
export const currentFileAtom = atom<CurrentFile>({} as CurrentFile);

const fitAddon = new FitAddon();

export function useProject() {
  const [ currentFile, setCurrentFile ] = useAtom(currentFileAtom);

  const [ openedFiles, setOpenedFiles ] = useAtom(openedFilesAtom);
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

  const handleRedirect = () => {
    const iframeEl = document.querySelector('iframe');
    (iframeEl as HTMLIFrameElement).src = appUrl;
  }

  return {
    appUrl,
    setAppUrl,
    handleRedirect,
    openedFiles,
    setOpenedFiles,
    currentFile,
    setCurrentFile,
  }
}