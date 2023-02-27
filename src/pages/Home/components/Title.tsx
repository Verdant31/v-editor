import { motion } from 'framer-motion';
import { useState } from 'react';
import './style.css';

interface TitleProps {
  updateAnimationStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Title({ updateAnimationStatus }: TitleProps) {
  const [ showName, setShowName ] = useState(false);
  const title = "V-Editor."
  const subTitle = "Hi stranger, and welcome to...";

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        {subTitle.split(',').map((word, index) => (
          <div className="flex" key={word}>
            {word.split("").map((char, charIndex) => {
              return (
                <motion.h1
                  className="font-monospace text-4xl"
                  key={charIndex + index}
                  onAnimationComplete={() => (charIndex === word.length - 1 && index === subTitle.split(",").length - 1) && setTimeout(() => setShowName(true), 1000)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: charIndex * 0.1 + index * 1.5}}
                >
                  {(char === ' ' && charIndex !== 0) ? '\u00A0' : char}
                  {char === 'r' && charIndex === word.length -1 && ','}

                </motion.h1>
              )
            })}
          </div>
        ))}
      </div>
      {showName && <div className="flex">
        {title.split("").map((char, index) => (
          <motion.h1
            className="neonText"
            onAnimationComplete={() => index === title.length - 1 && updateAnimationStatus(true)}
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {char}
          </motion.h1>
        ))}
      </div>}
    </div>
  )
}
