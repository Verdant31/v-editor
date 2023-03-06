import { Resizable } from 're-resizable';
import { useState } from 'react';
import { useQuery } from "react-query";
import { getIconFromExtension } from '../../utils/getIconFromExtension';
import FolderAccordion from '../Accordion';
import { getFiles } from "./query";

function Folder({folder, folderName, isUnique = false }: any) {
  if(isUnique) {
    return (
      <FolderAccordion title={folderName}>
        {Object.values(folder).map((file: any) => {
          return (
            <div key={file.name} className="flex items-center gap-2">
              {getIconFromExtension(file.name)}
              <div className=" whitespace-nowrap flex">
                <span>{file.name}</span>
              </div>
            </div>
          )
        })}
      </FolderAccordion>
    )
  }

  if (Object.keys(folder).length === 1) {
    return <Folder folder={folder[Object.keys(folder)[0]]} folderName={Object.keys(folder)[0]} />
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
                folder={subfolderOrFile}
                isUnique={true}
              />
            )
              
          }
        }
        if(Object.keys(subfolderOrFile).includes('name')){
          return (
            <div key={subfolderOrFile.name} className="flex items-center gap-2">
              {getIconFromExtension(subfolderOrFile.name)}
              <div className=" whitespace-nowrap flex">
                <span>{subfolderOrFile.name}</span>
              </div>
            </div>
          )
        };
        return <Folder key={subfolderOrFile.name} folder={subfolderOrFile} folderName={Object.keys(folder)[index]} />
      })}
    </FolderAccordion>
  );
}

function FolderTree({folders} : any) {
  return (
    <div>
      {Object.keys(folders).map((folder: any) => {
        if(Object.keys(folders[folder]).length === 2) {
          return (
            <div key={folders[folder].name} className="flex items-center  gap-2">
              {getIconFromExtension(folders[folder].name)}
              <div className=" whitespace-nowrap flex">
                <span>{folders[folder].name}</span>
              </div>
            </div>
          )
        }
        return (
          <Folder key={folder.name} folder={folders[folder]} folderName={folder} />
        )
      })}
    </div>
  );
}

export function FoldersBar() {
  const [ width, setWidth ] = useState(220)
  const { data } = useQuery('getFilesNames', async () => await getFiles())
  
  return (
    <div className="h-[100vh] flex">
      <Resizable 
        size={{width,height: 'auto', }}
        minWidth={220}
        onResizeStop={(e, direction, ref, d) => {
          if(width + d.width < 220) return setWidth(220)
          setWidth(width + d.width)
        }}
        maxWidth={400}
        className="px-4 py-2  bg-[#151518] "
        enable={{right: true}}
      >
      <div className="flex flex-col">
        {data && data.map((folder) => (
          <FolderAccordion key={folder.name} width={width} totalLength={data.length} title={folder.name}>
            <FolderTree folders={folder.dirs} />
          </FolderAccordion>
        ))}
      </div>
      </Resizable>
    </div>
  )
}

