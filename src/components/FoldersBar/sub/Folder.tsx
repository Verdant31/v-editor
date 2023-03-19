import { getIconFromExtension } from '../../../utils/getIconFromExtension';
import FolderAccordion from '../../Accordion';

interface FolderProps {
  folder: any;
  folderName: string;
  isUnique?: boolean;
  fatherFolder: string;
  handleOpenFile: (path: string) => void;
  displayMenu: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, path: string) => void;
  currentRenamingFile: string | undefined;
  newNameFile: string | undefined;
  setNewNameFile: (newNameFile: string) => void;
  handleResetRename: () => void;
  handlerRenameFile: () => void;
}

export function Folder({
  folder, 
  folderName, 
  isUnique = false, 
  fatherFolder, 
  handleOpenFile,
  displayMenu,
  currentRenamingFile,
  newNameFile,
  setNewNameFile,
  handleResetRename,
  handlerRenameFile
}: FolderProps) {
  if(Object.keys(folder).length === 2 && !isUnique) {
    const path = `${fatherFolder}/${folderName}`;
    return (
      <div 
        onContextMenu={(e) => displayMenu(e, path) }
        onClick={() => handleOpenFile(path)}
        className="flex items-center gap-2 cursor-pointer"
      >
        {getIconFromExtension(folder.name)}
        <div className=" whitespace-nowrap flex">
          {currentRenamingFile !== path
            ? <span>{folder.name}</span>
            : (
              <input 
                onKeyDown={(e) => {
                  if(e.key === "Escape") handleResetRename();
                  if(e.key === "Enter") handlerRenameFile()
                }}
                onBlur={() => handleResetRename()}
                className="bg-transparent w-32 outline-none cursor-pointer border-[1px] border-[#8257e5]" 
                value={(currentRenamingFile !== path)
                  ? folder.name
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
  if(isUnique) {
    return (
      <FolderAccordion path={fatherFolder} title={folderName}>
        {Object.values(folder).map((file: any) => {
          const path = `${fatherFolder}/${file.name}`
          return (
            <div 
              onContextMenu={(e) => displayMenu(e, path) }
              onClick={() => handleOpenFile(path)} 
              key={path} 
              className="flex items-center gap-2 cursor-pointer"
            >
              {getIconFromExtension(file.name)}
              <div className="whitespace-nowrap flex">
                {currentRenamingFile !== path
                  ? <span>{file.name}</span>
                  : (
                    <input 
                      onKeyDown={(e) => {
                        if(e.key === "Escape") handleResetRename();
                        if(e.key === "Enter") handlerRenameFile()
                      }}
                      onBlur={() => handleResetRename()}
                      className="bg-transparent w-32 outline-none cursor-pointer border-[1px] border-[#8257e5]" 
                      value={(currentRenamingFile !== path)
                        ? file.name
                        : newNameFile
                      } 
                      onChange={(e) => setNewNameFile(e.target.value)}
                    />
                  )
                }
              </div>
            </div>
          )
        })}
      </FolderAccordion>
    )
  }

  if (Object.keys(folder).length === 1) {
    return (
      <FolderAccordion path={fatherFolder + '/' + folderName} title={folderName}>
        <Folder 
          folder={folder[Object.keys(folder)[0]]} 
          folderName={Object.keys(folder)[0]}
          fatherFolder={fatherFolder + '/' + folderName} 
          handleOpenFile={handleOpenFile}
          displayMenu={displayMenu}
          currentRenamingFile={currentRenamingFile}
          newNameFile={newNameFile}
          setNewNameFile={setNewNameFile}
          handleResetRename={handleResetRename}
          handlerRenameFile={handlerRenameFile}
        />
      </FolderAccordion>
    )
  }

  
  return (
    <FolderAccordion path={fatherFolder + '/' + folderName} title={folder.name ? folder.name : folderName}>
      {Object.values(folder).map((subfolderOrFile: any, index) => {
        if(Object.keys(subfolderOrFile).length === 1) {
          if(Object.keys(Object.assign({}, Object.values(subfolderOrFile)[0])).length === 2) {
            return (
              <Folder 
                key={`${fatherFolder}/${folderName}/${Object.keys(folder)[index]}`}
                folderName={Object.keys(folder)[index]}
                fatherFolder={`${fatherFolder}/${folderName}/${Object.keys(folder)[index]}`}
                folder={subfolderOrFile}
                isUnique={true}
                handleOpenFile={handleOpenFile}
                displayMenu={displayMenu}
                currentRenamingFile={currentRenamingFile}
                newNameFile={newNameFile}
                setNewNameFile={setNewNameFile}
                handleResetRename={handleResetRename}
                handlerRenameFile={handlerRenameFile}
              />
            )
          }
        }
        
        if(Object.keys(subfolderOrFile).includes('name')){
          const path = `${fatherFolder}/${folderName}/${subfolderOrFile.name}`
          return (
            <div 
              onContextMenu={(e) => displayMenu(e, path) }
              onClick={() => handleOpenFile(path)}
              key={path} 
              className="flex items-center gap-2 cursor-pointer"
            >
              {getIconFromExtension(subfolderOrFile.name)}
              <div className=" whitespace-nowrap flex">
                {currentRenamingFile !== path
                  ? <span>{subfolderOrFile.name}</span>
                  : (
                    <input 
                      onKeyDown={(e) => {
                        if(e.key === "Escape") handleResetRename();
                        if(e.key === "Enter") handlerRenameFile()
                      }}
                      onBlur={() => handleResetRename()}
                      className="bg-transparent w-32 outline-none cursor-pointer border-[1px] border-[#8257e5]" 
                      value={(currentRenamingFile !== path)
                        ? subfolderOrFile.name
                        : newNameFile
                      } 
                      onChange={(e) => setNewNameFile(e.target.value)}
                    />
                  )
                }
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
          displayMenu={displayMenu}
          currentRenamingFile={currentRenamingFile}
          newNameFile={newNameFile}
          setNewNameFile={setNewNameFile}
          handleResetRename={handleResetRename}
          handlerRenameFile={handlerRenameFile}
        />
      })}
    </FolderAccordion>
  );
}