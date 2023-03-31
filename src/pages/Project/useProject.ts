import { atom, useAtom } from 'jotai';
import { useEffect } from "react";
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { browserWidthAtom } from '../../components/Browser';
import { CurrentFile } from '../../components/File/useFile';
import { foldersWidthAtom } from '../../components/FoldersBar';
import { terminalHeightAtom } from '../../components/Terminal/useTerminal';
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

const fitAddon = new FitAddon();

export function useProject() {
  const [ openedFiles, setOpenedFiles ] = useAtom(openedFilesAtom);
  const [ terminalInstance, setTerminalInstance ] = useAtom(terminalAtom);
  const [ appUrl, setAppUrl ] = useAtom(appUrlAtom);
  const [ terminalHeight,  ] = useAtom(terminalHeightAtom);
  const [ browserWidth,  ] = useAtom(browserWidthAtom);
  const [ foldersWidth,  ] = useAtom(foldersWidthAtom);

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
    terminalHeight,
    browserWidth,
    foldersWidth,
  }
}