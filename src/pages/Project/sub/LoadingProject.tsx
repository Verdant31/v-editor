import { AnimatePresence, motion } from 'framer-motion';
import { useAtom } from 'jotai';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { appUrlAtom } from '../useProject';

export default function LoadingProject() {
  const [ appUrl, setAppUrl ] = useAtom(appUrlAtom);

  return (
    <AnimatePresence>
      {!appUrl && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute left-[50%] w-96 translate-x-[-50%] top-[30%] translate-y-[-30%] flex flex-col justify-center items-center gap-8 px-12"
        >
          <PacmanLoader  
            color="#8257e5"
            loading={true}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <h1 className="text-center font-monospace">Have a sip of coffee while we inicializate your project...</h1>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
