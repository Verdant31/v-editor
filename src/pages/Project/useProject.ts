import ANSIToHTML from 'ansi-to-html';
import { useEffect, useState } from "react";

const ANSIConverter = new ANSIToHTML()

export function useProject() {
  const [output, setOutput] = useState<string[]>([])
  const [ projectIsRunning, setProjectIsRunning ] = useState(false)
  const [ appUrl, setAppUrl ] = useState<string>()

  // useEffect(() => {
  //   if(!projectIsRunning) handleRunProject();
  // },[])

  useEffect(() => {
    setAppUrl(output.find((line) => line.includes('🌎 Address: '))?.split('🌎 Address: ')[1])
  },[output])

  // const handleRunProject = async () => {
  //   const webContainer = await getWebContainerInstance()

  //   const createProject = await webContainer.spawn('npx', ['create-vite-app', '.', '--template=react-ts'], {
  //     output: false,
  //   })
    
  //   setOutput(['🔥 Installing dependecies...'])
  //   createProject.output.pipeTo(
  //     new WritableStream({
  //       write(data) {
  //         setOutput((state) => [...state, ANSIConverter.toHtml(data)])
  //       },
  //     }),
  //   )
  //   await createProject.exit
  //   const install = await webContainer.spawn('npm', ['install'])
  //   await install.exit;
    
  //   await webContainer.spawn('npm', ['run', 'dev'])
  //   webContainer.on("server-ready", (port, url) => {
  //     const iframeEl = document.querySelector('iframe');
  //     (iframeEl as HTMLIFrameElement).src = url;
  //     setProjectIsRunning(true)
  //     setOutput((state) => [
  //       ...state, 
  //       '🚀 Running the application!', 
  //       '🌎 Address: ' + url,
  //     ])
  //   });
  // }

  return {
    output,
    projectIsRunning,
    appUrl,
    setAppUrl,
  }
}