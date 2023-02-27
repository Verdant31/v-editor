import ANSIToHTML from 'ansi-to-html';
import { useState } from "react";
import { getWebContainerInstance } from '../../lib/webContainer';

const ANSIConverter = new ANSIToHTML()

export function useProject() {
  const [output, setOutput] = useState<string[]>([])

  const handleRunProject = async () => {
    const webContainer = await getWebContainerInstance()

    const createProject = await webContainer.spawn('npx', ['create-vite-app', '.', '--template=react-ts'], {
      output: false,
    })

    setOutput(['🔥 Installing dependencies!'])

    createProject.output.pipeTo(
      new WritableStream({
        write(data) {
          setOutput((state) => [...state, ANSIConverter.toHtml(data)])
        },
      }),
    )
    await createProject.exit

    setOutput((state) => [...state, '---------', '🚀 Running the application!'])

    const install = await webContainer.spawn('npm', ['install'])
    await install.exit;
    
    const start = await webContainer.spawn('npm', ['run', 'dev'])

    webContainer.on("server-ready", (port, url) => {
      const iframeEl = document.querySelector('iframe');
      (iframeEl as HTMLIFrameElement).src = url;
    });

    
    start.output.pipeTo(
      new WritableStream({
        write(data) {
          if(data.includes('')) return;
          setOutput((state) => [...state, ANSIConverter.toHtml(data)])
        },
      }),
    )
  }

  return {
    output,
    handleRunProject,
  }
}