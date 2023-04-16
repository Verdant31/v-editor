import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';
import { openedFilesAtom } from '../../pages/Project/useProject';
import { saveFile } from '../../services/queries/folders';

export type CurrentFile = {
  code: string;
  extension: string | undefined;
  name: string;
  completePath: string;
}

export const initialCodeAtom = atom<CurrentFile>({} as CurrentFile)

export function useFile() {
  const [ openedFiles, setOpenedFiles ] = useAtom(openedFilesAtom);
  
  const currentFile = openedFiles.find(file => file.isCurrent);

  useEffect(() => {
    if(!currentFile) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        setOpenedFiles(prev => {
          const fileIndex = prev.findIndex(file => file.completePath === currentFile.completePath);
          const newFiles = [...prev];
          newFiles[fileIndex] = {...newFiles[fileIndex], isDirty: false, unsaved: false, initialCode: currentFile.code};
          return newFiles;
        })
        saveFile(currentFile.completePath, currentFile.code);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentFile?.code]);

  useEffect(() => {
    if(!currentFile) return;
    const formattedCurrentFileCode = currentFile.code.length > 0 ? currentFile.code.replace(/\s/g, "") : currentFile.code;
    const formattedInitialCode = currentFile.initialCode.length > 0 ? currentFile.initialCode.replace(/\s/g, "") : currentFile.initialCode;

    const codesAreDifferent = formattedCurrentFileCode !== formattedInitialCode;
    
    if(codesAreDifferent) {
      setOpenedFiles(prev => {
        const fileIndex = prev.findIndex(file => file.completePath === currentFile.completePath);
        const newFiles = [...prev];
        newFiles[fileIndex] = {...newFiles[fileIndex], isDirty: true, unsaved: true};
        return newFiles;
      })
    }else {
      setOpenedFiles(prev => {
        const fileIndex = prev.findIndex(file => file.completePath === currentFile.completePath);
        const newFiles = [...prev];
        newFiles[fileIndex] = {...newFiles[fileIndex], isDirty: false};
        return newFiles;
      })
    }
  }, [currentFile?.code])

  return {
    currentFile,
    setOpenedFiles,
    openedFiles
  }

}