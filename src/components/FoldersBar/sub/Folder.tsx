import { useAtom } from 'jotai';
import { useState } from 'react';
import { Item, Menu, Separator, useContextMenu } from 'react-contexify';
import { useMutation } from 'react-query';
import { getIconFromExtension } from '../../../utils/getIconFromExtension';
import FolderAccordion from '../../Accordion';
import { currentFileAtom, initialCodeAtom } from '../../File/useFile';
import { openFile, renameFile } from '../query';

export function Folder({folder, folderName, isUnique = false, fatherFolder, handleOpenFile}: any) {
  if(Object.keys(folder).length === 2 && !isUnique) {
    return (
      <div 
        onClick={() => handleOpenFile(`${fatherFolder}/${folderName}/${folder.name}`)}
        key={folder.name} 
        className="flex items-center gap-2 cursor-pointer"
      >
        {getIconFromExtension(folder.name)}
        <div className=" whitespace-nowrap flex">
          <span>{folder.name}</span>
        </div>
      </div>
    )
  }
  if(isUnique) {
    return (
      <FolderAccordion title={folderName}>
        {Object.values(folder).map((file: any) => {
          return (
            <div 
              onClick={() => handleOpenFile(`${fatherFolder}/${file.name}`)} 
              key={file.name} 
              className="flex items-center gap-2 cursor-pointer"
            >
              {getIconFromExtension(file.name)}
              <div className="whitespace-nowrap flex">
                <span>{file.name}</span>
              </div>
            </div>
          )
        })}
      </FolderAccordion>
    )
  }

  if (Object.keys(folder).length === 1) {
    return (
      <FolderAccordion title={folderName}>
        <Folder 
          folder={folder[Object.keys(folder)[0]]} 
          folderName={Object.keys(folder)[0]}
          fatherFolder={`${fatherFolder}/${folderName}`} 
          handleOpenFile={handleOpenFile}
        />
      </FolderAccordion>
    )
  }

    
  return (
    <FolderAccordion title={folder.name ? folder.name : folderName}>
      {Object.values(folder).map((subfolderOrFile: any, index) => {
        if(Object.keys(subfolderOrFile).length === 1) {
          if(Object.keys(Object.assign({}, Object.values(subfolderOrFile)[0])).length === 2) {
            return (
              <Folder 
                key={Object.keys(subfolderOrFile)[0]}
                folderName={Object.keys(folder)[index]}
                fatherFolder={`${fatherFolder}/${folderName}/${Object.keys(folder)[index]}`}
                folder={subfolderOrFile}
                isUnique={true}
                handleOpenFile={handleOpenFile}
              />
            )
          }
        }
        
        if(Object.keys(subfolderOrFile).includes('name')){
          return (
            <div 
              onClick={() => handleOpenFile(`${fatherFolder}/${folderName}/${subfolderOrFile.name}`)}
              key={subfolderOrFile.name} 
              className="flex items-center gap-2 cursor-pointer"
            >
              {getIconFromExtension(subfolderOrFile.name)}
              <div className=" whitespace-nowrap flex">
                <span>{subfolderOrFile.name}</span>
              </div>
            </div>
          )
        };
        return <Folder 
          key={subfolderOrFile.name} 
          folder={subfolderOrFile} 
          folderName={Object.keys(folder)[index]} 
          fatherFolder={`${fatherFolder}/${folderName}`}
          handleOpenFile={handleOpenFile}
        />
      })}
    </FolderAccordion>
  );
}

export function FolderTree({folders, fatherFolder, refetch } : any) {
  const [ , setCode ] = useAtom(currentFileAtom);
  const [ , setInitialCode ] = useAtom(initialCodeAtom);

  const [ currentRenamingFile, setCurrentRenamingFile ] = useState<string>();
  const [ newNameFile, setNewNameFile ] = useState<string>();
  
  const { show } = useContextMenu({id: fatherFolder});

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

  const displayMenu = (e: any, path: string) => {
    show({event: e, props: path});
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

  return (
    <div>
      <Menu id={fatherFolder} className="bg-[#8257e5]">
        <Item onClick={({props}) => handleStartRenamingProcess(props)}>
          <p className="font-monospace text-zinc-100">Rename file</p>
        </Item>
        <Separator  />
        <Item>
          <p className="font-monospace text-zinc-100">Delete file</p>
        </Item>
      </Menu>
      {Object.keys(folders).map((folder: any) => {
        if(Object.keys(folders[folder]).length === 2) {
          return (
            <div 
              onContextMenu={(e) => displayMenu(e, `${fatherFolder}/${folders[folder].name}`) }
              onClick={() => handleOpenFile(`${fatherFolder}/${folders[folder].name}`)}
              key={folders[folder].name} 
              className="flex items-center my-1 cursor-pointer"
            >
              {getIconFromExtension(folders[folder].name)}
              <div className="ml-2 whitespace-nowrap flex">
                {currentRenamingFile !== `${fatherFolder}/${folders[folder].name}`
                  ? <span>{folders[folder].name}</span>
                  : (
                    <input 
                      onKeyDown={(e) => {
                        if(e.key === "Escape") handleResetRename();
                        if(e.key === "Enter") handlerRenameFile()
                      }}
                      onBlur={() => handleResetRename()}
                      className="bg-transparent w-32 outline-none cursor-pointer border-[1px] border-[#8257e5]" 
                      value={(currentRenamingFile !== `${fatherFolder}/${folders[folder].name}`)
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
          />
        )
      })}
    </div>
  );
}
