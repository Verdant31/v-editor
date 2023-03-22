import { Terminal as XTerminal } from "xterm";
import { viteTree } from "../../lib/Vite/tree";
import { getWebContainerInstance } from "../../lib/webContainer";

export async function startShell(terminalInstance: XTerminal, updateAppUrl: (url: string) => void) {
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
    console.log(data)
    input.write(data);
  });
  
  startDevServer(terminalInstance, updateAppUrl);
};

export async function startDevServer(terminalInstance: XTerminal, updateAppUrl: (url: string) => void) {
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
    updateAppUrl(url);
    (iframeEl as HTMLIFrameElement).src = url;
  });
}

export async function installDependencies() {
  const webContainerInstance = await getWebContainerInstance();
  const installProcess = await webContainerInstance.spawn('npm', ['install']);
  return installProcess.exit;
}

