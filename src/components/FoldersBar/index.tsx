import { atom, useAtom } from 'jotai';
import { File, Files, MagnifyingGlass } from 'phosphor-react';
import { Resizable } from 're-resizable';
import { useState } from 'react';
import { useContextMenu } from 'react-contexify';
import { useQuery } from "react-query";
import { appUrlAtom } from '../../pages/Project/useProject';
import FolderAccordion from '../FoldersAccordion';
import { createFile, getFiles } from "./query";
import { Container } from './sub/Container';
import { RootFilesContextMenu } from './sub/ContextsMenus/RootFilesContextMenu';
import { FolderTree } from './sub/FolderTree';

export const foldersWidthAtom = atom(310)

export function FoldersBar() {
  const [ userIsCreatingFile, setUserIsCreatingFile ] = useState(false);
  const [ newFileName, setNewFileName ] = useState<string>('');
  
  const [ width, setWidth ] = useAtom(foldersWidthAtom);
  const [ appUrl,  ] = useAtom(appUrlAtom);

  const { show } = useContextMenu({id: "menu_id"});

  
  const { data,  refetch,  } = useQuery('getFilesNames', async () => await getFiles(), {
    enabled: !!appUrl,
  })  

  const displayMenu = (e: React.MouseEvent) => {
    if((e.target as HTMLDivElement).className !== "flex flex-col w-[100%]") return;
    show({event: e});
  }

  const handleCreateFile = async () => {
    await createFile(newFileName, '').then(() => {
      setUserIsCreatingFile(false);
      refetch();
    });
  }
  
  return (
    <Container width={width}>
      <RootFilesContextMenu  startFileCreating={() => setUserIsCreatingFile(true)} />
      <Resizable 
        size={{width, height: 'auto'}}
        minWidth={310}
        onResize={(e, direction, ref, d) => {
          if(ref.offsetWidth < 220) return setWidth(220);
          setWidth(ref.offsetWidth)
        }}
        maxWidth={450}
        className="bg-[#13111B] "
        enable={{right: true}}
      >
        {!!appUrl && (
          <div  className="flex h-[100%]" onContextMenu={displayMenu}>
            <div className="flex p-[10px] items-center flex-col gap-4 h-[100%] bg-[#201B2D]">
              <Files size={32} />
              <MagnifyingGlass size={32} />
            </div>
            <div  className="flex flex-col w-[100%]" style={{height: `calc(100% - ${24}px)`, marginTop: 24}}>
              <p className="w-[100%] p-2 px-4 text-sm font-monospace">V-EDITOR</p>
              <p className="w-[100%] bg-[#191622] p-2 px-4 text-sm font-monospace">Explore files</p>
              <div className="p-4 pb-1 overflow-y-scroll">
                {data && data.map((folder) => {
                  if(folder.name === "root") {
                    return (
                      <FolderTree refetch={refetch} key={folder.name} fatherFolder={""} folders={folder.dirs} />
                    )
                  }
                  return (
                    <FolderAccordion refetch={refetch} path={folder.name} key={folder.name} width={width} totalLength={data.length} title={folder.name}>
                      <FolderTree refetch={refetch} fatherFolder={folder.name} folders={folder.dirs} />
                    </FolderAccordion>
                  )
                })}
              </div>
              {userIsCreatingFile && (
                <div className="px-[12px] gap-2 flex items-center">
                  <File size={24} weight="light" />
                  <input 
                    onBlur={() => setUserIsCreatingFile(false)}
                    onKeyDown={(e) => {
                      if(e.key === "Escape") setUserIsCreatingFile(false);
                      if(e.key === "Enter") handleCreateFile();
                    }}
                    autoFocus
                    onChange={(e) => setNewFileName(e.target.value)}
                    className="bg-transparent border-[1px] border-[#8257e5] outline-none pl-2" 
                    type="text"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </Resizable>
    </Container>
  )
}

