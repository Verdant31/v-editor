import { AnimatePresence, motion } from 'framer-motion';
import PacmanLoader from 'react-spinners/PacmanLoader';

interface LoadingProjectProps {
  appUrl: string;
}
export default function LoadingProject({appUrl} : LoadingProjectProps) {
  return (
    <AnimatePresence>
      {!appUrl && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute left-[35%] w-96 translate-x-[-35%] top-[30%] translate-y-[-30%] flex flex-col justify-center items-center gap-8 px-12"
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
