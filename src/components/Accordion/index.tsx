import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Folder } from 'phosphor-react';

interface FolderAccordionProps {
  title: string;
  children: React.ReactNode;
}

export default function FolderAccordion({ title, children }: FolderAccordionProps) {
  return (
    <Accordion.Item className="AccordionItem" value={title} >
      <Accordion.Header>
        <Accordion.Trigger className="flex items-center gap-2 group">
          <Folder size={24} weight="fill" />
          {title}
          <ChevronDownIcon
            className="ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
            aria-hidden
          />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content>
        <div className="ml-8">
          {children}
        </div>
      </Accordion.Content>
    </Accordion.Item>
  )
}
