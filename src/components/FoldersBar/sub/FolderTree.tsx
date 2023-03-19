import { useAtom } from 'jotai';
import { useState } from 'react';
import { useContextMenu } from 'react-contexify';
import { useMutation } from 'react-query';
import { getIconFromExtension } from '../../../utils/getIconFromExtension';
import { currentFileAtom, initialCodeAtom } from '../../File/useFile';
import { openFile, renameFile } from '../query';
import { FilesContextMenu } from './FilesContextMenu';
import { Folder } from './Folder';

interface FolderTreeProps {
  folders: any;
  fatherFolder: string;
  refetch: () => void;
}

export function FolderTree({folders, fatherFolder, refetch } : FolderTreeProps) {
  const [ , setCode ] = useAtom(currentFileAtom);
  const [ , setInitialCode ] = useAtom(initialCodeAtom);

  const [ currentRenamingFile, setCurrentRenamingFile ] = useState<string>();
  const [ newNameFile, setNewNameFile ] = useState<string>();
  
  const { show: showFilesMenu } = useContextMenu({id: fatherFolder});

  const openFileMutation = useMutation(async (fileName: string) => {
    await openFile(fileName).then((res) => {
      if(!res) return;
      setCode(res)
      setInitialCode(res.code)
    })
  });

  const handleOpenFile = (fileName: string) => {
    openFileMutation.mutateAsync(fileName)
  }

  const handleStartRenamingProcess = async (path: string) => {
    setNewNameFile(path.split('/').pop())
    setCurrentRenamingFile(path)
    setTimeout(() => {
      const inputValue = path.split('/').pop();
      const input = document.querySelector(`input[value="${inputValue}"]`) as HTMLInputElement;
      input.focus();
    }, 100)
  }

  const handleResetRename = () => {
    setCurrentRenamingFile(undefined)
  }

  const handlerRenameFile = async () => {
    if(!currentRenamingFile || !newNameFile) return;
    const pathWihoutName = currentRenamingFile.split('/').slice(0, -1).join('/');
    await renameFile(currentRenamingFile, pathWihoutName + '/' + newNameFile ).then(() => {
      refetch()
      handleResetRename()
    })
  }

  const displayMenu = (e: React.MouseEvent, path: string) => {
    showFilesMenu({event: e, props: path});
  }

  return (
    <div>
      <FilesContextMenu 
        id={fatherFolder}
        handleStartRenamingProcess={handleStartRenamingProcess}
      />
      {Object.keys(folders).map((folder: any) => {
        if(Object.keys(folders[folder]).length === 2) {
          const path = `${fatherFolder}/${folders[folder].name}`
          return (
            <div 
              onContextMenu={(e) => displayMenu(e, path) }
              onClick={() => handleOpenFile(path)}
              key={path} 
              className="flex items-center my-1 cursor-pointer"
            >
              {getIconFromExtension(folders[folder].name)}
              <div className="ml-2 whitespace-nowrap flex">
                {currentRenamingFile !== path
                  ? <span>{folders[folder].name}</span>
                  : (
                    <input 
                      onKeyDown={(e) => {
                        if(e.key === "Escape") handleResetRename();
                        if(e.key === "Enter") handlerRenameFile()
                      }}
                      onBlur={() => handleResetRename()}
                      className="bg-transparent w-32 outline-none cursor-pointer border-[1px] border-[#8257e5]" 
                      value={(currentRenamingFile !== path)
                        ? folders[folder].name
                        : newNameFile
                      } 
                      onChange={(e) => setNewNameFile(e.target.value)}
                    />
                  )
                }
              </div>
            </div>
          )
        }
        return (
          <Folder
            key={folder.name} 
            folder={folders[folder]} 
            folderName={folder} 
            fatherFolder={fatherFolder}  
            handleOpenFile={handleOpenFile}
            displayMenu={displayMenu}
            currentRenamingFile={currentRenamingFile}
            newNameFile={newNameFile}
            setNewNameFile={setNewNameFile}
            handleResetRename={handleResetRename}
            handlerRenameFile={handlerRenameFile}
          />
        )
      })}
    </div>
  );
}
