import { Browser } from '../../components/Browser';
import File from '../../components/File';
import { FoldersBar } from '../../components/FoldersBar';
import { Terminal } from '../../components/Terminal';
import Topbar from '../../components/Topbar';
import LoadingProject from './sub/LoadingProject';
import { useProject } from './useProject';

export function Project() {
  const { appUrl, setAppUrl } = useProject();
  return (
    <div className="w-[100vw] h-[100vh] relative flex flex-col">
      <Topbar />
      <Terminal />
      <FoldersBar />
      {!!appUrl && <File />}
      <LoadingProject  />
      <Browser
        projectIsRunning={!!appUrl}
        appUrl={appUrl}
        setAppUrl={setAppUrl}
      />
    </div>
  )
}
