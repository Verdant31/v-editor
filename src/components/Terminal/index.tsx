import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { CaretDown, CaretUp } from 'phosphor-react';
import { Resizable } from 're-resizable';
import 'xterm/css/xterm.css';
import { browserWidthAtom } from '../Browser';
import { foldersWidthAtom } from '../FoldersBar';
import { useTerminal } from './useTerminal';

export function Terminal() {
  const { height, setHeight, isCollapsed, setIsCollapsed } = useTerminal();
  const [ browserWidth,  ] = useAtom(browserWidthAtom);
  const [ foldersWidth,  ] = useAtom(foldersWidthAtom);

  return (
    <motion.div 
      className="absolute bottom-0 bg-[#191622] mt-4 "
      initial={{ y: 200 }}
      style={{width: `calc(100% - ${browserWidth + foldersWidth}px)`, left: foldersWidth}}
      transition={{ duration: 1 }}
      animate={{ y: 0 }}
    >
      <Resizable
        size={{height, width: "100%"}}
        maxHeight={400}
        onResize={(e, direction, ref, d) => {
          if(ref.offsetHeight < 200) return setHeight(200);
          if(ref.offsetHeight > 400) return setHeight(400);
          setHeight(ref.offsetHeight)
        }}
        className="border-t-[2px] border-t-pink-400"
        style={resizableCss}
        enable={{top: true}}
      >
        <div className="flex justify-between items-center p-2 bg-[#191622]">
          <h1 className="font-monospace">Terminal</h1>
          <div onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed 
              ? <CaretUp className="cursor-pointer"  size={24}  />
              : <CaretDown className="cursor-pointer"  size={24}  /> 
            }
          </div>
        </div>
        <div id="parent" style={{height: height - 40, paddingLeft: "20px"}}>
          <div className="terminal"></div>
        </div>
      </Resizable>
    </motion.div>
  )
}
       
const resizableCss : React.CSSProperties = {
  display: "flex", 
  flexDirection: 'column',
  position: "absolute", 
  bottom: 0, 
  left: 0, 
  background: "#191622",
}