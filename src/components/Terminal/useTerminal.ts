import { useEffect, useState } from 'react';
import { Terminal as XTerminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import { viteTree } from '../../lib/reactTree';
import { getWebContainerInstance } from '../../lib/webContainer';

export function useTerminal() {
  const fitAddon = new FitAddon();

  const [ terminalInstance, setTerminalInstance ] = useState<XTerminal | null>(null);
  const [ height, setHeight ] = useState(200);

  async function startDevServer() {
    const webContainerInstance = await getWebContainerInstance();
    const runProject = await webContainerInstance.spawn('npm', ['run', 'dev']);

    runProject.output.pipeTo(
      new WritableStream({
        write(data) {
          terminalInstance?.write(data);
        },
      })
    );
    
    webContainerInstance.on('server-ready', (port, url) => {
      const iframeEl = document.querySelector('iframe');
      console.log(iframeEl);
      (iframeEl as HTMLIFrameElement).src = url;
    });
  }

  useEffect(() => {
    if(!terminalInstance) {
      const terminal = new XTerminal({
        convertEol: true,
        rows: 8,
        fontFamily: 'JetBrains Mono, monospace',
        theme: {
          blue: '#98db9f',
          magenta: '#98db9f',
          background: '#202024',
        },
      });
      terminal.loadAddon(fitAddon);
      fitAddon.fit();
      setTerminalInstance(terminal);
      return;
    }
    startShell(terminalInstance);
    terminalInstance.open(document.querySelector('.terminal') as HTMLElement);
  }, [terminalInstance])

  useEffect(() => {
    terminalInstance?.resize(terminalInstance.cols, Math.floor(height/20));
  },[height])

  async function installDependencies() {
    const webContainerInstance = await getWebContainerInstance();
    const installProcess = await webContainerInstance.spawn('npm', ['install']);
    return installProcess.exit;
  }

  async function startShell(terminalInstance: XTerminal) {
    if(!terminalInstance) return;
    const webContainerInstance = await getWebContainerInstance();
    await webContainerInstance.mount(viteTree);
    
    const exitCode = await installDependencies();
    if (exitCode !== 0) {
      throw new Error('Installation failed');
    };
    const shellProcess = await webContainerInstance.spawn('jsh');
    shellProcess.output.pipeTo(
      new WritableStream({
        write(data) {
          terminalInstance.write(data);
        },
      })
    );
  
    const input = shellProcess.input.getWriter();
    terminalInstance.onData((data) => {
      input.write(data);
    });
    startDevServer();
    return shellProcess;
  };

  return {
    height,
    setHeight,
    startShell
  }
}