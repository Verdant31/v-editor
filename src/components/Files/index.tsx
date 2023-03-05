import * as Accordion from '@radix-ui/react-accordion';
import { useQuery } from "react-query";
import { getIconFromExtension } from '../../utils/getIconFromExtension';
import FolderAccordion from '../Accordion';
import { getFiles } from "./query";

function Folder({folder, folderName }: any) {
  if (Object.keys(folder).length === 1) {
    return (
      <Folder folder={folder[Object.keys(folder)[0]]} folderName={Object.keys(folder)[0]} />
    )      
  }
    
  return (
    <FolderAccordion title={folder.name ? folder.name : folderName}>
      {Object.values(folder).map((subfolderOrFile: any, index) => {
        if(Object.keys(subfolderOrFile).includes('name')){
          return (
            <div key={subfolderOrFile.name} className="flex items-center my-[4px] gap-2">
              {getIconFromExtension(subfolderOrFile.name)}
              <p>{subfolderOrFile.name}</p>
            </div>
          )
        };
        return (
          <Folder key={subfolderOrFile.name} folder={subfolderOrFile} folderName={Object.keys(folder)[index]} />
        )
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
            <div key={folders[folder].name} className="flex items-center my-[4px] gap-2">
              {getIconFromExtension(folders[folder].name)}
              <p>{folders[folder].name}</p>
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
  const { data } = useQuery('getFilesNames', async () => await getFiles())
  
  return (
    <div className="h-[100vh] w-[700px] bg-[#151518] px-4 py-2">
      <div className="flex flex-col">
        <Accordion.Root type="multiple">
          {data && data.map((folder) => (
            <FolderAccordion totalLength={data.length} title={folder.name}>
              <FolderTree folders={folder.dirs} />
            </FolderAccordion>
          ))}
        </Accordion.Root>
      </div>
    </div>
  )
}

