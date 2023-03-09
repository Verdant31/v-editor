import { motion } from 'framer-motion';
import { CaretDown, CaretUp } from 'phosphor-react';
import { Resizable } from 're-resizable';
import 'xterm/css/xterm.css';
import { useTerminal } from './useTerminal';

const resizableCss : React.CSSProperties = {
  display: "flex", 
  flexDirection: 'column',
  position: "absolute", 
  bottom: 0, 
  left: 0, 
  background: "#191622",
}

export function Terminal() {
  const { height, setHeight, isCollapsed, setIsCollapsed } = useTerminal();

  return (
    <motion.div 
      className="relative w-[100%] bg-[#191622] "
      initial={{
        y: 200,
      }}
      transition={{
        duration: 1
      }}
      animate={{
        y: 0,
      }}
    >
      <Resizable
        size={{height, width: "100%"}}
        maxHeight={400}
        onResizeStop={(e, direction, ref, d) => {
          setHeight(height + d.height);
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
        <div id="parent" style={{height: height - 40, paddingLeft: "20px", paddingTop: "10px"}}>
          <div className="terminal"></div>
        </div>
      </Resizable>
    </motion.div>
  )
}
       