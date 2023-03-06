import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Folder } from 'phosphor-react';

const getFolderColor = (folderName: string) => {
  switch(folderName) {
    case 'node_modules':
      return '#a3e635';
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
}


export default function FolderAccordion({ title, children, totalLength = 1, width}: FolderAccordionProps) {
  const contentHeight = typeof window !== 'undefined' ? (window.innerHeight - totalLength*64) : 0;

  return (
    <Disclosure>
      <Disclosure.Button className="flex items-center whitespace-nowrap gap-2 group">
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
          style={{maxHeight: contentHeight, width: width as number - 32 }} 
          className="overflow-y-scroll padding-0"
      >
          <div className="ml-4 mb-2">
            {children}
          </div>
      </Disclosure.Panel>
    </Disclosure>
  )
}

