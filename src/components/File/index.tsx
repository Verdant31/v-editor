import CodeEditor from '@uiw/react-textarea-code-editor'
import { atom, useAtom } from 'jotai'
import { X } from 'phosphor-react'
import { browserWidthAtom } from "../Browser"
import { foldersWidthAtom } from "../FoldersBar"
import { terminalHeightAtom } from "../Terminal/useTerminal"

type CurrentFile = {
  code: string;
  extension: string | undefined;
  name: string;
}

export const currentFileAtom = atom<CurrentFile>({} as CurrentFile);

export default function File() {
  const [ terminalHeight,  ] = useAtom(terminalHeightAtom);
  const [ browserWidth,  ] = useAtom(browserWidthAtom);
  const [ foldersWidth,  ] = useAtom(foldersWidthAtom);

  const [ currentFile, setCurrentFile ] = useAtom(currentFileAtom);

  return (
    <div 
      className="bg-[#191622] absolute flex flex-col"
      style={{
        height: `calc(100vh - ${terminalHeight}px - 24px)`,
        width: `calc(100vw - ${browserWidth}px - ${foldersWidth}px)`,
        left: `${foldersWidth}px`,
        top: '24px'
      }}
    >
      <div className="pt-2 px-6 flex items-center gap-2 mb-2">
        <p className="font-monospace text-zinc-300">{currentFile.name}</p> 
        <X size={16} /> 
      </div>
      <div className="overflow-auto">
        <CodeEditor
          value={currentFile.code}
          language={currentFile.extension}
          //onChange={(event) => setCode(event.target.value)}
          minHeight={80}
          padding={20}
          spellCheck={false}
          className="text-sm bg-[#191622] font-monospace rounded"
        />
      </div>
    </div>
  )
}
