import { motion } from 'framer-motion';
import { Resizable } from 're-resizable';

interface BrowserProps {
  projectIsRunning: boolean;
  appUrl: string | undefined;
  setAppUrl: (value: string) => void;
}

export function Browser({ appUrl, projectIsRunning, setAppUrl}: BrowserProps) {
  return (
    <motion.div 
      className="bg-[#202024] h-[100%] flex"
      initial={{
        x: 200,
      }}
      transition={{
        duration: 1
      }}
      animate={{
        x: 0,
      }}
    >
        <Resizable
          maxWidth={700}
          minWidth={320}
          enable={{left: true}}
          className="border-l-[10px] border-[#151518]"
          defaultSize={{
            width: 320,
            height: '100%',
          }}
        >
          <div className="h-12 bg-[#151518] flex items-center justify-center ">
            {projectIsRunning && (
              <input 
                onChange={(e) => setAppUrl(e.target.value)}
                className="rounded-sm text-gray-200 bg-[#202024] w-full mx-8 h-6 text-sm p-2 outline-none " 
                value={appUrl} 
              />
            )}
          </div>
          <iframe 
            marginHeight={0} 
            marginWidth={0} 
            style={{display: projectIsRunning ? "inherit" : "none", height: "calc(100% - 48px)"}} 
            src="" width="100%"  />
        </Resizable>
      </motion.div>
  )
}
