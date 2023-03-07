import { motion } from 'framer-motion';
import { Browser } from '../../components/Browser';
import { FoldersBar } from '../../components/Files';
import { Terminal } from '../../components/Terminal';
import LoadingProject from "./sub/LoadingProject";
import { useProject } from './useProject';

export function Project() {
  const { appUrl, setAppUrl } = useProject();
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col">
      <motion.div 
        className="w-[100%] bg-[#8257e5]"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
      >
        <p className="text-white font-semibold tracking-wider font-monospace text-center">V-EDITOR</p>
      </motion.div>
      <main className="flex relative justify-between w-[100%] h-[100%]">
        {!!appUrl && <FoldersBar />}
        <Terminal  />
        <LoadingProject appUrl={appUrl} />
        <Browser
          projectIsRunning={!!appUrl}
          appUrl={appUrl}
          setAppUrl={setAppUrl}
        />
      </main>
    </div>
  )
}
