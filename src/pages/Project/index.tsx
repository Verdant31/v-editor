import PacmanLoader from "react-spinners/PacmanLoader";
import { Browser } from '../../components/Browser';
import { FoldersBar } from '../../components/Files';
import { Terminal } from '../../components/Terminal';
import { useProject } from './useProject';

export function Project() {
  const { appUrl, setAppUrl } = useProject();
  return (
    <main className="flex relative justify-between w-[100vw]">
      {!!appUrl && <FoldersBar />}
      <Terminal  />
      {!appUrl && (
        <div className="absolute left-[50%] w-96 translate-x-[-50%] top-[30%] translate-y-[-30%] flex flex-col justify-center items-center gap-8 px-12">
          <PacmanLoader  
            color="#8257e5"
            loading={true}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <h1 className="text-center font-monospace">Have a sip of coffee while we inicializate your project...</h1>
        </div>
      )}
      <Browser
        projectIsRunning={!!appUrl}
        appUrl={appUrl}
        setAppUrl={setAppUrl}
      />
    </main>
  )
}
