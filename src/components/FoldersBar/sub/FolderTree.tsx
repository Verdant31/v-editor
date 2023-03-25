import { useAtom } from 'jotai';
import { useState } from 'react';
import { useContextMenu } from 'react-contexify';
import { useMutation } from 'react-query';
import { openedFilesAtom } from '../../../pages/Project/useProject';
import { getIconFromExtension } from '../../../utils/getIconFromExtension';
import FileActionsModal from '../../Modals/FileActionsModal';
import { deleteFolder, openFile, renameFile } from '../query';
import { FilesContextMenu } from './ContextsMenus/FilesContextMenu';
import { Folder } from './Folder';

interface FolderTreeProps {
  folders: any;
  fatherFolder: string;
  refetch: () => void;
}

export function FolderTree({folders, fatherFolder, refetch } : FolderTreeProps) {
  const [ isRenameFileModalOpen, setIsRenameFileModalOpen ] = useState(false);
  const [ currentRenamingFile, setCurrentRenamingFile ] = useState<string>();
  const [ openedFiles, setOpenedFiles ] = useAtom(openedFilesAtom);

  const { show: showFilesMenu } = useContextMenu({id: fatherFolder});

  const openFileMutation = useMutation(async (fileName: string) => {
    await openFile(fileName).then((res) => {
      if(!res) return;
      if(openFile.length === 0) {
        setOpenedFiles([{...res, isCurrent: true, isDirty: false, initialCode: res.code}])
      }else {
        const isFileAlreadyOpened = openedFiles.find((file) => file.completePath === res.completePath);
        if(isFileAlreadyOpened) {
          setOpenedFiles(openedFiles.map((file) => {
            if(file.completePath === res.completePath) {
              return {...file, isCurrent: true}
            }
            return {...file, isCurrent: false}
          }))
        }else {
          const setAllFilesAsNotCurrent = openedFiles.map((file) => {
            return {...file, isCurrent: false}
          })
          setOpenedFiles([...setAllFilesAsNotCurrent, {...res, isCurrent: true, isDirty: false, initialCode: res.code}])
        }
      }
    })
  });

  const handleOpenFile = (fileName: string) => {
    openFileMutation.mutateAsync(fileName);
  }

  const handlerRenameFile = async (newName: string) => {
    if(!currentRenamingFile) return;
    const pathWihoutName = currentRenamingFile.split('/').slice(0, -1).join('/');
    await renameFile(currentRenamingFile, pathWihoutName + '/' + newName).then(() => {
      setIsRenameFileModalOpen(false)
      refetch()
    })
  }

  const handleStartRenamingProcess = async (path: string) => {
    setCurrentRenamingFile(path)
    setIsRenameFileModalOpen(true)
  }

  const displayMenu = (e: React.MouseEvent, path: string) => {
    showFilesMenu({event: e, props: path})
  };

  const handleDeleteFile = async (path: string,) => { 
    await deleteFolder(path, refetch);
  }

  return (
    <div>
      <FileActionsModal 
        handleAction={handlerRenameFile}
        isOpen={isRenameFileModalOpen}
        setIsOpen={setIsRenameFileModalOpen}
      />
      <FilesContextMenu 
        id={fatherFolder} 
        handleDeleteFile={handleDeleteFile}
        handleStartRenamingProcess={handleStartRenamingProcess} 
      />
      {Object.keys(folders).map((folder: any) => {
        if(Object.keys(folders[folder]).length === 2 && Object.keys(folders[folder]).includes('name')) {
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
                <span>{folders[folder].name}</span>
              </div>
            </div>
          )
        }
        return (
          <Folder
            refetch={refetch}
            key={folder} 
            folder={folders[folder]} 
            folderName={folder} 
            fatherFolder={fatherFolder}  
            handleOpenFile={handleOpenFile}
            displayMenu={displayMenu}
          />
        )
      })}
    </div>
  );
}
