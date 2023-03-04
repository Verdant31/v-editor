import Browser from '../../components/Browser';
import { Terminal } from '../../components/Terminal';
import { useProject } from './useProject';

export function Project() {
  const { appUrl, setAppUrl } = useProject();
  return (
    <main className="flex relative justify-between w-[100vw]">
      <Terminal  />
      <Browser
        projectIsRunning={!!appUrl}
        appUrl={appUrl}
        setAppUrl={setAppUrl}
      />
    </main>
  )
}
