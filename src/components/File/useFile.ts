import { atom, useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { getWebContainerInstance } from "../../lib/webContainer"
import { browserWidthAtom } from "../Browser"
import { foldersWidthAtom } from "../FoldersBar"
import { terminalHeightAtom } from "../Terminal/useTerminal"

type CurrentFile = {
  code: string;
  extension: string | undefined;
  name: string;
  completePath: string;
}

export const currentFileAtom = atom<CurrentFile>({} as CurrentFile);
export const initialCodeAtom = atom<string>('');


export function useFile() {
  const [ codeIsDirty, setCodeIsDirty ] = useState(false);

  const [ terminalHeight,  ] = useAtom(terminalHeightAtom);
  const [ browserWidth,  ] = useAtom(browserWidthAtom);
  const [ foldersWidth,  ] = useAtom(foldersWidthAtom);
    
  const [ currentFile, setCurrentFile ] = useAtom(currentFileAtom);
  const [ initialCode, setInitialCode  ] = useAtom(initialCodeAtom);

  const handleCloseFile = () => {
    setCurrentFile({} as CurrentFile);
    setInitialCode('');
    setCodeIsDirty(false);
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        setCodeIsDirty(false);
        saveFile(currentFile.completePath, currentFile.code);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [codeIsDirty]);

  useEffect(() => {
    if(currentFile.code && currentFile.code.length > 0 && currentFile.code !== initialCode) {
      console.log(currentFile.code !== initialCode)
      setCodeIsDirty(true);
    }
  }, [currentFile.code])

  return {
    currentFile,
    setCurrentFile,
    handleCloseFile,
    codeIsDirty,
    terminalHeight,
    browserWidth,
    foldersWidth,
    setCodeIsDirty
  }

}

export const saveFile = async (path: string, content: string) => {
  const webContainer = await getWebContainerInstance();
  try {
    await webContainer.fs.writeFile(path, content);
  } catch (error) {
    console.log(error);
  }
}
