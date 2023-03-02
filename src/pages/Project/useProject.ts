import ANSIToHTML from 'ansi-to-html';
import { useEffect, useState } from "react";
import { getWebContainerInstance } from '../../lib/webContainer';

const ANSIConverter = new ANSIToHTML()

export function useProject() {
  const [output, setOutput] = useState<string[]>([])
  const [ projectIsRunning, setProjectIsRunning ] = useState(false)

  useEffect(() => {
    if(!projectIsRunning) handleRunProject();
  },[])

  const handleRunProject = async () => {
    const webContainer = await getWebContainerInstance()

    const createProject = await webContainer.spawn('npx', ['create-vite-app', '.', '--template=react-ts'], {
      output: false,
    })
    
    setOutput(['🔥 Installing dependecies...'])
    createProject.output.pipeTo(
      new WritableStream({
        write(data) {
          setOutput((state) => [...state, ANSIConverter.toHtml(data)])
        },
      }),
    )
    await createProject.exit
    const install = await webContainer.spawn('npm', ['install'])
    await install.exit;
    
    await webContainer.spawn('npm', ['run', 'dev'])
    webContainer.on("server-ready", (port, url) => {
      const iframeEl = document.querySelector('iframe');
      (iframeEl as HTMLIFrameElement).src = url;
      setProjectIsRunning(true)
      setOutput((state) => [
        ...state, 
        '🚀 Running the application!', 
        '🌎 Address: ' + url,
      ])
    });
    
  }

  const appUrl = output.find((line) => line.includes('🌎 Address: '))?.split('🌎 Address: ')[1];

  return {
    output,
    handleRunProject,
    projectIsRunning,
    appUrl,
  }
}