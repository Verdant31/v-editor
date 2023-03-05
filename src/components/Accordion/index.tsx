import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Folder } from 'phosphor-react';

interface FolderAccordionProps {
  title: string;
  children: React.ReactNode;
  totalLength?: number;
}

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

export default function FolderAccordion({ title, children, totalLength = 1}: FolderAccordionProps) {

  const contentHeight = typeof window !== 'undefined' ? (window.innerHeight - totalLength*64) : 0;

  return (
    <Accordion.Item className="AccordionItem" value={title} className="mt-2">
      <Accordion.Header >
        <Accordion.Trigger className="flex items-center gap-2 group">
          <Folder 
            size={24} 
            weight="fill"
            color={getFolderColor(title)} 
          />
          {title}
          <ChevronDownIcon
            className="ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
            aria-hidden
          />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content style={{maxHeight: contentHeight}} className="overflow-y-scroll">
        <div className="ml-6 mt-2">
          {children}
        </div>
      </Accordion.Content>
    </Accordion.Item>
  )
}
