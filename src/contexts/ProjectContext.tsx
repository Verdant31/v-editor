import { createContext, useContext, useEffect, useState } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';

interface ProjectContextProps {
 terminalInstance: Terminal | undefined;
}

interface ProjectContextOProviderProps {
  children: React.ReactNode;
 }

export const ProjectContext = createContext<ProjectContextProps>({} as ProjectContextProps);

export const ProjectContextProvider = ({children} : ProjectContextOProviderProps) => {
  const [ terminalInstance, setTerminalInstance ] = useState<Terminal>();
  
  useEffect(() => {
    const fitAddon = new FitAddon();
    const terminal = new Terminal({
      convertEol: true,
      fontFamily: 'JetBrains Mono, monospace',
      theme: {
        blue: '#98db9f',
        magenta: '#98db9f',
        background: '#202024',
      },
      
    });
    terminal.loadAddon(fitAddon);

    setTerminalInstance(terminal);
  },[]);


  return (
    <ProjectContext.Provider value={{ terminalInstance }}>
      {children}
    </ProjectContext.Provider>
  )
}

export const useProject = () => {
  const value = useContext(ProjectContext);
  return value;
}