import { motion } from 'framer-motion';
import { Resizable } from 're-resizable';
import { useState } from 'react';
import { useQuery } from "react-query";
import FolderAccordion from '../Accordion';
import { getFiles } from "./query";
import { FolderTree } from './sub';

export function FoldersBar() {
  const [ width, setWidth ] = useState(220)
  const { data } = useQuery('getFilesNames', async () => await getFiles())
  
  return (
    <motion.div 
      className="h-[100vh] flex"
      initial={{  x: -200, width: 0  }}
      transition={{ duration: 1}}
      animate={{ x: 0, width: width }}
    >
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
    </motion.div>
  )
}

