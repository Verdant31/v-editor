import { atom, useAtom } from 'jotai';
import { Files, MagnifyingGlass } from 'phosphor-react';
import { Resizable } from 're-resizable';
import { useQuery } from "react-query";
import { appUrlAtom } from '../../pages/Project/useProject';
import FolderAccordion from '../Accordion';
import { getFiles } from "./query";
import { Container } from './sub/Container';
import { FolderTree } from './sub/Folder';

export const foldersWidthAtom = atom(310)

export function FoldersBar() {
  const [ width, setWidth ] = useAtom(foldersWidthAtom);
  const [ appUrl,  ] = useAtom(appUrlAtom);

  const { data } = useQuery('getFilesNames', async () => await getFiles(), {
    enabled: !!appUrl,
  })
  
  return (
    <Container width={width}>
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
          <div className="flex h-[100%]">
            <div className="flex p-[10px] items-center flex-col gap-4 h-[100%] bg-[#201B2D]">
              <Files size={32} />
              <MagnifyingGlass size={32} />
            </div>
            <div className="flex flex-col w-[100%] " style={{height: `calc(100% - ${24}px)`, marginTop: 24}}>
              <p className="w-[100%] p-2 px-4 text-sm font-monospace">V-EDITOR</p>
              <p className="w-[100%] bg-[#191622] p-2 px-4 text-sm font-monospace">Explorar arquivos</p>
              <div className="p-4 overflow-y-scroll">
                {data && data.map((folder) => {
                  if(folder.name === "root") {
                    return (
                      <FolderTree key={folder.name} fatherFolder={""} folders={folder.dirs} />
                    )
                  }
                  return (
                    <FolderAccordion key={folder.name} width={width} totalLength={data.length} title={folder.name}>
                      <FolderTree fatherFolder={folder.name} folders={folder.dirs} />
                    </FolderAccordion>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </Resizable>
    </Container>
  )
}

