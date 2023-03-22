import { getIconFromExtension } from '../../../utils/getIconFromExtension';
import FolderAccordion from '../../FoldersAccordion';

interface FolderProps {
  folder: any;
  folderName: string;
  isUnique?: boolean;
  fatherFolder: string;
  handleOpenFile: (path: string) => void;
  displayMenu: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, path: string) => void;
  refetch: () => void;
}

export function Folder({
  folder, 
  folderName, 
  isUnique = false, 
  fatherFolder, 
  handleOpenFile,
  displayMenu,
  refetch
}: FolderProps) {

  if(Object.keys(folder).length === 2 && !isUnique && Object.keys(folder).includes('name')) {
    const path = `${fatherFolder}/${folderName}`;
    return (
      <div 
        onContextMenu={(e) => displayMenu(e, path) }
        onClick={() => handleOpenFile(path)}
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
      <FolderAccordion refetch={refetch} path={fatherFolder} title={folderName}>
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
      <FolderAccordion refetch={refetch} path={fatherFolder + '/' + folderName} title={folderName}>
        <Folder 
          folder={folder[Object.keys(folder)[0]]} 
          folderName={Object.keys(folder)[0]}
          fatherFolder={fatherFolder + '/' + folderName} 
          handleOpenFile={handleOpenFile}
          displayMenu={displayMenu}
          refetch={refetch}
        />
      </FolderAccordion>
    )
  }

  
  return (
    <FolderAccordion refetch={refetch} path={fatherFolder + '/' + folderName} title={folder.name ? folder.name : folderName}>
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
                refetch={refetch}
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
          displayMenu={displayMenu}
          refetch={refetch}
        />
      })}
    </FolderAccordion>
  );
}