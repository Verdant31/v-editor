import { Resizable } from 're-resizable';
import PacmanLoader from "react-spinners/PacmanLoader";
interface BrowserProps {
  projectIsRunning: boolean;
  appUrl: string | undefined;
  setAppUrl: (value: string) => void;
}

export default function Browser({ appUrl, projectIsRunning, setAppUrl}: BrowserProps) {
  return (
    <div className="bg-[#202024]">
        <div className="h-12 bg-[#151518] flex items-center justify-center ">
          {projectIsRunning && (
            <input 
              onChange={(e) => setAppUrl(e.target.value)}
              className="rounded-lg text-black w-full mx-8 h-6 text-sm p-2 outline-none " 
              value={appUrl} 
            />
          )}
        </div>
        <Resizable
          maxWidth={700}
          minWidth={320}
          enable={{left: true}}
          className="border-l-[10px] border-[#151518]"
          defaultSize={{
            width: 320,
            height: window.innerHeight - 48
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
  )
}
