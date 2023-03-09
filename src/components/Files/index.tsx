import { atom, useAtom } from 'jotai';
import { Files, MagnifyingGlass } from 'phosphor-react';
import { Resizable } from 're-resizable';
import { useState } from 'react';
import { useQuery } from "react-query";
import FolderAccordion from '../Accordion';
import { getFiles } from "./query";
import { Container } from './sub/Container';
import { FolderTree } from './sub/Folder';

export const foldersWidthAtom = atom(260)

export function FoldersBar() {
  const [ alreadyAnimated, setAlreadyAnimated ] = useState(false);
  const [ width, setWidth ] = useAtom(foldersWidthAtom);
  const { data } = useQuery('getFilesNames', async () => await getFiles())

  return (
    <Container
      alreadyAnimated={alreadyAnimated}
      setAlreadyAnimated={setAlreadyAnimated}
      width={width}
    >
      <Resizable 
        size={{width,height: 'auto', }}
        minWidth={260}
        onResize={(e, direction, ref, d) => {
          if(ref.offsetWidth < 220) return setWidth(220);
          setWidth(ref.offsetWidth)
        }}
        maxWidth={400}
        className="bg-[#13111B] "
        enable={{right: true}}
      >
        <div className="flex h-[100%]">
          <div className="flex p-4 items-center flex-col gap-4 h-[100%] bg-[#201B2D]">
            <Files size={32} />
            <MagnifyingGlass size={32} />
          </div>
          <div className="flex flex-col w-[100%]">
            <p className="w-[100%] bg-[#201B2D] p-1 py-[6px] text-sm font-monospace">Explorar arquivos</p>
            <div className="p-2">
              {data && data.map((folder) => (
                <FolderAccordion key={folder.name} width={width} totalLength={data.length} title={folder.name}>
                  <FolderTree folders={folder.dirs} />
                </FolderAccordion>
              ))}
            </div>
          </div>
        </div>
      </Resizable>
    </Container>
  )
}

