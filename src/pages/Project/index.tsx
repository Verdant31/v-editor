import { Lightning } from 'phosphor-react';
import './index.css';
import { useProject } from './useProject';
import { Resizable } from 're-resizable';


export function Project() {
  const { handleRunProject, output } = useProject();
  const appAlreadyIsRunning = output.includes("  Dev server running at:\n")
  return (
    <main className="flex justify-between ">
      <div>
        <button className="flex gap-2 justify-center items-center h-10 bg-[#8257e5] rounded-md w-24 hover:scale-105 toransition-all duration-300" onClick={handleRunProject}> 
          <p className="text-lg">Run</p>
          <Lightning size={24} weight="fill" />
        </button>
        {output.length > 0 &&  (
          <div className="font-monospace text-xs leading-loose mt-12">
            {output.map((line) => {
              return <p key={line} dangerouslySetInnerHTML={{ __html: line }} />
            })}
          </div>
        )}
      </div>
      {appAlreadyIsRunning && (
        <div>
          <div className="h-10 bg-[#202024]"></div>
          <Resizable
            maxWidth={700}
            minWidth={320}
            enable={{left: true}}
            className="border-l-[10px] border-[#202024] border-solid"
            defaultSize={{
              width: 320,
              height: window.innerHeight - 40
            }}
          >
            <iframe marginHeight={0} marginWidth={0} style={{margin: 0}} src="" width="100%" height="100%" />            
          </Resizable>
        </div>
      )}
    </main>
  )
}
