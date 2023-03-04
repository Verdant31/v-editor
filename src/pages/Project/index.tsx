import Browser from '../../components/Browser';
import { Terminal } from '../../components/Terminal';
import { useProject } from './useProject';

export function Project() {
  const { projectIsRunning, appUrl, setAppUrl} = useProject();
  return (
    <main className="flex relative justify-between w-[100vw]">
      <div className="relative w-[100%]">
        <Terminal  />
      </div>
      <Browser 
        projectIsRunning={projectIsRunning}
        appUrl={appUrl}
        setAppUrl={setAppUrl}
      />
    </main>
  )
}
