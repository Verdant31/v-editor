import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Folder } from 'phosphor-react';
import { useState } from 'react';
import { Item, Menu, Separator, useContextMenu } from 'react-contexify';
import "react-contexify/dist/ReactContexify.css";
import { getFolderColor } from '../../utils/getFolderColor';
import { renameFolder } from '../FoldersBar/query';
import RenameFolderModal from '../Modals/RenameFolder';

interface FolderAccordionProps {
  title: string;
  children: React.ReactNode;
  totalLength?: number;
  width?: number;
  path: string;
  displayFolderMenu?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, path: string) => void;
  refetch?: () => void;
}


export default function FolderAccordion({ 
  title, 
  children, 
  totalLength = 1, 
  width,
  path,
  refetch
}: FolderAccordionProps) {
  const [ isRenameFolderModalOpen, setIsRenameFolderModalOpen ] = useState(false);
  
  const { show } = useContextMenu({id: path});
  const contentHeight = typeof window !== 'undefined' ? (window.innerHeight - totalLength*64) : 0;

  const displayFoldersMenu = (e: React.MouseEvent) => {
    show({event: e});
  }
  
  const handleRenameFolder = async (newFolderName: string) => {
    if(!refetch) return;
    await renameFolder(path, newFolderName, refetch).then(() => {
      setIsRenameFolderModalOpen(false);
    });
  }

  return (
    <Disclosure>
      <RenameFolderModal 
        handleRenameFolder={handleRenameFolder}
        isOpen={isRenameFolderModalOpen} 
        setIsOpen={setIsRenameFolderModalOpen}
      />
      <Menu id={path} className="bg-[#8257e5]">
        <Item onClick={(e) => setIsRenameFolderModalOpen(true)}>
          <p className="font-monospace text-zinc-100">New file</p>
        </Item>
        <Separator  />
        <Item onClick={(e) => setIsRenameFolderModalOpen(true)}>
          <p className="font-monospace text-zinc-100">Rename folder</p>
        </Item>
        <Separator  />
        <Item>
          <p className="font-monospace text-zinc-100">Delete folder</p>
        </Item>
      </Menu>
      <Disclosure.Button 
        onContextMenu={(e) => displayFoldersMenu(e)} 
        className="flex items-center whitespace-nowrap gap-2 group my-1 focus-visible:outline-none"
      >
        <Folder 
          size={24} 
          weight="fill"
          color={getFolderColor(title)} 
        />
        <span>{title}</span>
        <ChevronDownIcon
          className="ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
          aria-hidden
        />
      </Disclosure.Button>
      <Disclosure.Panel 
          style={{maxHeight: contentHeight - totalLength * 24, width: width as number - 100 }} 
          className="overflow-y-scroll padding-0"
      >
          <div className="ml-4 mb-2 mt-1">
            {children}
          </div>
      </Disclosure.Panel>
    </Disclosure>
  )
}

