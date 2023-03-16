import { motion } from 'framer-motion';
import { atom, useAtom } from 'jotai';
import { Resizable } from 're-resizable';

interface BrowserProps {
  projectIsRunning: boolean;
  appUrl: string | undefined;
  setAppUrl: (value: string) => void;
}

export const browserWidthAtom = atom(340)


export function Browser({ appUrl, projectIsRunning, setAppUrl}: BrowserProps) {
  const [ width, setWidth ] = useAtom(browserWidthAtom);
  
  return (
    <motion.div 
      className="bg-[#202024] h-[100%] flex absolute right-0"
      initial={{ x: 200,}}
      style={{height: `calc(100% - ${24}px)`, marginTop: 24}}
      transition={{ duration: 1}}
      animate={{ x: 0,}}
    >
        <Resizable
          maxWidth={700}
          size={{width,height: '100%', }}
          enable={{left: true}}
          onResize={(e, direction, ref, d) => {
            if(ref.offsetWidth < 320) return setWidth(340);
            if(ref.offsetWidth > 700) return setWidth(700);
            setWidth(ref.offsetWidth)
          }}
          className="border-l-[10px] border-[#13111B]"
        >
          <div className="h-12 bg-[#13111B] flex items-center justify-center ">
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
