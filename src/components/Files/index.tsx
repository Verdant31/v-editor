import * as Accordion from '@radix-ui/react-accordion';
import { useQuery } from "react-query";
import FolderAccordion from '../Accordion';
import { getFiles } from "./query";

function Folder({folder, folderName }: any) {
  if (Object.keys(folder).length === 1) {
    console.log("Folder", folder);
    return (
      <Folder folder={folder[Object.keys(folder)[0]]} folderName={Object.keys(folder)[0]} />
    )      

  }
  
  return (
    <FolderAccordion title={folder.name ? folder.name : folderName}>
      {Object.values(folder).map((subfolderOrFile: any, index) => {
        if(Object.keys(subfolderOrFile).includes('name')){
          return (
            <div>{subfolderOrFile.name}</div>
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
      {Object.keys(folders).map((folder: any) => (
        <Folder key={folder.name} folder={folders[folder]} folderName={folder} />
      ))}
    </div>
  );
}


export function FoldersBar() {
  const { data } = useQuery('getFilesNames', async () => await getFiles())
  
  return (
    <div className="h-[100vh] w-[700px] bg-[#151518] p-6">
      <div className="flex flex-col gap-2">
        <Accordion.Root type="multiple">
          {data && data.map((folder) => (
            <FolderTree folders={folder.dirs} />
          ))}
        </Accordion.Root>
      </div>
    </div>
  )
}

