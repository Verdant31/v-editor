import { motion } from 'framer-motion';

interface ContainerProps {
  alreadyAnimated: boolean;
  setAlreadyAnimated: (value: boolean) => void;
  children: React.ReactNode;
  width: number;
}

export function Container({ alreadyAnimated, children, setAlreadyAnimated, width }: ContainerProps) {
  if(alreadyAnimated) {
    return <div className="flex">
      {children}
    </div>
  }
  return (
    <motion.div 
      className="flex"
      onAnimationComplete={() => setAlreadyAnimated(true)}
      initial={{  x: -200, width: 0, }}
      transition={{ duration: 1}}
      animate={{ x: 0, width}}
    >
      {children}	
    </motion.div>
  )
}
