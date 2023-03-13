import { motion } from 'framer-motion';
import { atom, useAtom } from 'jotai';

interface ContainerProps {
  children: React.ReactNode;
  width: number;
}

export const foldersAlreadyAnimated = atom(false);

export function Container({ children, width }: ContainerProps) {
  const [ alreadyAnimated, setAlreadyAnimated ] = useAtom(foldersAlreadyAnimated);

  if(alreadyAnimated) {
    return <div className="flex absolute left-0 h-[100%]">
      {children}
    </div>
  }
  return (
    <motion.div 
      className="flex absolute left-0 h-[100%]"
      style={{height: `calc(100% - ${24}px)`, marginTop: 24}}
      onAnimationComplete={() => setAlreadyAnimated(true)}
      initial={{  x: -200, width: 0, }}
      transition={{ duration: 1}}
      animate={{ x: 0, width}}
    >
      {children}	
    </motion.div>
  )
}
