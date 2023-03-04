import { Resizable } from 're-resizable';
import 'xterm/css/xterm.css';
import { useTerminal } from './useTerminal';

const resizableCss : React.CSSProperties = {
  display: "flex", 
  flexDirection: 'column',
  position: "absolute", 
  bottom: 0, 
  left: 0, 
  background: "#202024",
}

export function Terminal() {
  const { height, setHeight } = useTerminal();

  return (
    <Resizable
      size={{height, width: "100%"}}
      maxHeight={400}
      minHeight={200}
      onResizeStop={(e, direction, ref, d) => {
        setHeight(height + d.height);
      }}
      style={resizableCss}
      enable={{top: true}}
    >
      <h1 className="bg-[#151518] font-monospace p-2 px-4">Terminal</h1>
      <div style={{height: height - 40, paddingLeft: "20px", paddingTop: "10px"}}>
        <div className="terminal"></div>
      </div>
    </Resizable>
  )
}
       