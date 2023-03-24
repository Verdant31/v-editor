import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { createdFileFromTopbarAtom } from '../FoldersBar';
import { createFile } from '../FoldersBar/query';
import FileActionsModal from '../Modals/FileActionsModal';

export default function Topbar() {
  const [ createFileModalIsOpen, setCreateFileModalIsOpen ] = useState(false);
  const [ , setCreatedFileFromTopbar ] = useAtom(createdFileFromTopbarAtom);

  const handleCreateFile = async (newValue: string) => {
    await createFile('./' + newValue, '').then(() => {
      setCreateFileModalIsOpen(false);
      setCreatedFileFromTopbar(true)
    });
  }

  return (
    <motion.div className="w-[100%] flex items-center justify-center gap-4 bg-[#13111B]">
      <FileActionsModal 
        handleAction={handleCreateFile}
        isOpen={createFileModalIsOpen} 
        setIsOpen={setCreateFileModalIsOpen}
      />
      <p 
        className="text-white text-[12px] py-[3px] tracking-wider font-monospace cursor-pointer"
        onClick={() => setCreateFileModalIsOpen(true)}
      >
        New file
      </p>
      <a
        href="https://github.com/verdant31"
        target="_blank"
        className="text-white text-[12px] py-[3px] tracking-wider font-monospace cursor-pointer"
      >
        Github
      </a>
      <a 
        href="https://www.linkedin.com/in/jo%C3%A3o-pedro-soares-piovesan-724235191/"
        target="_blank"
        className="text-white text-[12px] py-[3px] tracking-wider font-monospace cursor-pointer"
      >
        Linkedin
      </a>
    </motion.div>
  )
}
