import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Folder } from 'phosphor-react';

const getFolderColor = (folderName: string) => {
  switch(folderName) {
    case 'node_modules':
      return '#a3e635';
    case 'assets':
      return '#f5d60b';
    case 'src':
      return '#4ade80';
    case 'pages':
      return '#b91c1c';
    case 'public':
      return '#0284c7';
    default:
      return '#fff';
  }
}


interface FolderAccordionProps {
  title: string;
  children: React.ReactNode;
  totalLength?: number;
  width?: number;
  path: string;
  displayFolderMenu?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, path: string) => void;
}


export default function FolderAccordion({ 
  title, 
  children, 
  totalLength = 1, 
  width,
  path,
  displayFolderMenu
}: FolderAccordionProps) {
  const contentHeight = typeof window !== 'undefined' ? (window.innerHeight - totalLength*64) : 0;

  return (
    <Disclosure>
      <Disclosure.Button 
        onContextMenu={(e) => displayFolderMenu && displayFolderMenu(e as any, path)} 
        className="flex items-center whitespace-nowrap gap-2 group my-1 "
      >
        <Folder 
          size={24} 
          weight="fill"
          color={getFolderColor(title)} 
        />
        <span onClick={() => console.log(path)}>{title}</span>
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

