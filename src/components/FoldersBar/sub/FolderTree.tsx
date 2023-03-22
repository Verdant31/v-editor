import { useAtom } from 'jotai';
import { useState } from 'react';
import { useContextMenu } from 'react-contexify';
import { useMutation } from 'react-query';
import { getIconFromExtension } from '../../../utils/getIconFromExtension';
import { currentFileAtom, initialCodeAtom } from '../../File/useFile';
import RenameModal from '../../Modals/RenameFolder';
import { openFile, renameFile } from '../query';
import { FilesContextMenu } from './ContextsMenus/FilesContextMenu';
import { Folder } from './Folder';

interface FolderTreeProps {
  folders: any;
  fatherFolder: string;
  refetch: () => void;
}

export function FolderTree({folders, fatherFolder, refetch } : FolderTreeProps) {
  const [ , setCode ] = useAtom(currentFileAtom);
  const [ , setInitialCode ] = useAtom(initialCodeAtom);
  const [ isRenameFileModalOpen, setIsRenameFileModalOpen ] = useState(false);
  const [ currentRenamingFile, setCurrentRenamingFile ] = useState<string>();
  
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
  

  return (
    <div>
      <RenameModal 
        handleRename={handlerRenameFile}
        isOpen={isRenameFileModalOpen}
        setIsOpen={setIsRenameFileModalOpen}
      />
      <FilesContextMenu id={fatherFolder} handleStartRenamingProcess={handleStartRenamingProcess} />
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
                <span>{folders[folder].name}</span>
              </div>
            </div>
          )
        }
        return (
          <Folder
            refetch={refetch}
            key={folder.name} 
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
