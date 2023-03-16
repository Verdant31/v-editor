import CodeEditor from '@uiw/react-textarea-code-editor';
import { Circle, X } from 'phosphor-react';
import { useFile } from './useFile';

export default function File() {
  const { 
    currentFile,
    setCurrentFile,
    codeIsDirty,
    handleCloseFile,
    terminalHeight,
    browserWidth,
    foldersWidth
  } = useFile();
  
  return (
    <div 
      className="bg-[#191622] absolute flex flex-col justify-center"
      style={{
        height: `calc(100vh - ${terminalHeight}px - 24px)`,
        width: `calc(100vw - ${browserWidth}px - ${foldersWidth}px)`,
        left: `${foldersWidth}px`,
        top: '24px'
      }}
    >
      {currentFile.name
        ? (
          <>
            <div className="pt-2 px-6 flex items-center gap-2 mb-2">
              {codeIsDirty && <Circle color="#f472b6" size={16} weight="fill" />}
              <p className="font-monospace text-zinc-300">{currentFile.name}</p> 
              <X className="cursor-pointer" size={16} onClick={handleCloseFile} /> 
            </div>
            <div className="overflow-auto h-full">
              <CodeEditor
                value={currentFile.code}
                language={currentFile.extension}
                onChange={(event) => setCurrentFile(prev => ({...prev, code: event.target.value}))}
                minHeight={80}
                padding={20}
                spellCheck={false}
                className="text-sm bg-[#191622] font-monospace rounded"
              />
            </div>
          </>
        )
        : (
          <div className="mx-auto text-center w-72">
            <h1 className="font-monospace">Your project is all set up, just pick a file and start coding.</h1>
            <h1 className="font-monospace mt-2">Enjoy our editor!</h1>
          </div>
        )
      }
    </div>
  )
}
