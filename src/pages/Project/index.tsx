import { useAtom } from 'jotai';
import { Circle, X } from 'phosphor-react';
import { Browser, browserWidthAtom } from '../../components/Browser';
import File from '../../components/File';
import { FoldersBar, foldersWidthAtom } from '../../components/FoldersBar';
import { Terminal } from '../../components/Terminal';
import { terminalHeightAtom } from '../../components/Terminal/useTerminal';
import Topbar from '../../components/Topbar';
import LoadingProject from './sub/LoadingProject';
import { useProject } from './useProject';

export function Project() {
  const { appUrl, setAppUrl, handleRedirect, openedFiles, setOpenedFiles } = useProject();

  const [ terminalHeight,  ] = useAtom(terminalHeightAtom);
  const [ browserWidth,  ] = useAtom(browserWidthAtom);
  const [ foldersWidth,  ] = useAtom(foldersWidthAtom);

  return (
    <div className="w-[100vw] h-[100vh] relative flex flex-col">
      <Topbar />
      <Terminal />
      <FoldersBar />
      {!!appUrl && (
        <div 
          className="bg-[#191622] absolute flex flex-col justify-center"
          style={{
            height: `calc(100vh - ${terminalHeight}px - 24px)`,
            width: `calc(100vw - ${browserWidth}px - ${foldersWidth}px)`,
            left: `${foldersWidth}px`,
            top: '24px'
            }}
          >
          {openedFiles.length === 0 && (
            <div className="mx-auto text-center w-72 ">
              <h1 className="font-monospace">Your project is all set up, just pick a file and start coding.</h1>
              <h1 className="font-monospace mt-2">Enjoy our editor!</h1>
            </div> 
          )}
          <div className="flex items-center absolute top-0 max-w-[100%] overflow-x-scroll">
            {openedFiles.length > 0 && openedFiles.map(file => (
              <div 
                key={file.completePath} 
                className="pt-2 px-6 flex items-center gap-2 pb-[4px]"
                style={{ backgroundColor: file.isCurrent ? '#201B2D' : 'transparent'}}
                onClick={() => {
                  const newFiles = openedFiles.map(openedFile => {
                    if (openedFile.completePath === file.completePath) {
                      return {
                        ...openedFile,
                        isCurrent: true,
                      }
                    }
                    return {
                      ...openedFile,
                      isCurrent: false,
                    }
                  })
                  setOpenedFiles(newFiles)
                }}
              >
                {file.isDirty && <Circle color="#f472b6" size={16} weight="fill" />}
                <p className="font-monospace text-zinc-300">{file.name}</p> 
                <X 
                  className="cursor-pointer z-50" size={16} 
                  onClick={(e) => {
                    e.stopPropagation()
                    const newFiles = openedFiles.filter(openedFile => openedFile.completePath !== file.completePath)
                    if (file.isCurrent && newFiles.length > 0) {
                      newFiles[newFiles.length - 1] = {
                        ...newFiles[newFiles.length - 1],
                        isCurrent: true,
                      }
                    }
                    setOpenedFiles(newFiles)
                  }}
                /> 
              </div>
            ))}   
          </div>
          {!(openedFiles.length === 0 )&& (
            <File />
          )}
        </div>
      )
      }
      <LoadingProject  />
      <Browser
        handleRedirect={handleRedirect}
        projectIsRunning={!!appUrl}
        appUrl={appUrl}
        setAppUrl={setAppUrl}
      />
    </div>
  )
}
