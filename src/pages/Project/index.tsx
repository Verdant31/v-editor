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
      <Browser
        projectIsRunning={!!appUrl}
        appUrl={appUrl}
        setAppUrl={setAppUrl}
      />
    </main>
  )
}
