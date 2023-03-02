import { Resizable } from 're-resizable';
import PacmanLoader from "react-spinners/PacmanLoader";
import { Terminal } from '../../components/Terminal';
import './index.css';
import { useProject } from './useProject';

export function Project() {
  const { output, projectIsRunning } = useProject();
  
  return (
    <main className="flex relative justify-between w-[100vw]">
      <div className="relative w-[100%]">
        <Terminal output={output} />
      </div>
      <div className="">
        <div className="h-10 bg-[#151518] "></div>
        <Resizable
          maxWidth={700}
          minWidth={320}
          enable={{left: true}}
          className="border-l-[10px] border-[#151518]"
          defaultSize={{
            width: 320,
            height: window.innerHeight - 40
          }}
        >
          {!projectIsRunning && (
            <div className="bg-[#202024] h-full w-full flex flex-col justify-center items-center gap-8 px-12">
              <PacmanLoader  
                color="#8257e5"
                loading={true}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              <h1 className="text-center font-monospace">Have a sip of coffee while we inicializate your project...</h1>
            </div>
          )}
          <iframe marginHeight={0} marginWidth={0} style={{display: projectIsRunning ? "inherit" : "none"}} src="" width="100%" height="100%" />
        </Resizable>
      </div>
    </main>
  )
}
