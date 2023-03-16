import { useAtom } from 'jotai';
import { useMutation } from 'react-query';
import { getIconFromExtension } from '../../../utils/getIconFromExtension';
import FolderAccordion from '../../Accordion';
import { currentFileAtom, initialCodeAtom } from '../../File/useFile';
import { openFile } from '../query';

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

export function FolderTree({folders, fatherFolder} : any) {
  const [ , setCode ] = useAtom(currentFileAtom);
  const [ , setInitialCode ] = useAtom(initialCodeAtom);
  
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

  return (
    <div>
      {Object.keys(folders).map((folder: any) => {
        if(Object.keys(folders[folder]).length === 2) {
          return (
            <div 
              onClick={() => handleOpenFile(`${fatherFolder}/${folders[folder].name}`)}
              key={folders[folder].name} 
              className="flex items-center my-1  gap-2 cursor-pointer"
            >
              {getIconFromExtension(folders[folder].name)}
              <div className=" whitespace-nowrap flex">
                <span>{folders[folder].name}</span>
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
