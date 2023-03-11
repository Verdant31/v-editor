import { atom, useAtom } from 'jotai';
import { Files, MagnifyingGlass } from 'phosphor-react';
import { Resizable } from 're-resizable';
import { useQuery } from "react-query";
import { appUrlAtom } from '../../pages/Project/useProject';
import FolderAccordion from '../Accordion';
import { getFiles } from "./query";
import { Container } from './sub/Container';
import { FolderTree } from './sub/Folder';

export const foldersWidthAtom = atom(260)

export function FoldersBar() {
  const [ width, setWidth ] = useAtom(foldersWidthAtom);
  const [ appUrl, setAppUrl ] = useAtom(appUrlAtom);

  const { data } = useQuery('getFilesNames', async () => await getFiles(), {
    enabled: !!appUrl,
  })
  
  return (
    <Container width={width}>
      <Resizable 
        size={{width, height: 'auto'}}
        minWidth={260}
        onResize={(e, direction, ref, d) => {
          if(ref.offsetWidth < 220) return setWidth(220);
          setWidth(ref.offsetWidth)
        }}
        maxWidth={400}
        className="bg-[#13111B] "
        enable={{right: true}}
      >
        {!!appUrl && (
          <div className="flex h-[100%]">
            <div className="flex p-4 items-center flex-col gap-4 h-[100%] bg-[#201B2D]">
              <Files size={32} />
              <MagnifyingGlass size={32} />
            </div>
            <div className="flex flex-col w-[100%]">
              <p className="w-[100%] pt-4 px-3  text-sm font-monospace">Explorar arquivos</p>
              <div className="p-2">
                {data && data.map((folder) => (
                  <FolderAccordion key={folder.name} width={width} totalLength={data.length} title={folder.name}>
                    <FolderTree folders={folder.dirs} />
                  </FolderAccordion>
                ))}
              </div>
            </div>
          </div>
        )}
      </Resizable>
    </Container>
  )
}

