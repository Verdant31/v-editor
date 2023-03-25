import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

interface FileActionsModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  handleAction: (newFolderName: string) => void;
  placeHolder?: string;
}

export default function FileActionsModal({ 
  isOpen, 
  setIsOpen, 
  handleAction,
  placeHolder = 'Write here your new name'
}: FileActionsModalProps) {
  const [ value, setValue ] = useState('');
  
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="bg-[#201B2D] transform overflow-hidden rounded-md p-4 text-left align-middle shadow-xl transition-all">
                <input 
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="bg-transparent min-w-[210px] outline-none" 
                  placeholder={placeHolder}
                  onKeyDown={(e) => {
                    if (e.key !== 'Enter') return
                    handleAction(value);
                    setValue('');
                  }}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
