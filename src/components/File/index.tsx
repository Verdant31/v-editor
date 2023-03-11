import { useAtom } from "jotai";
import { BrowserWidthAtom } from "../Browser";
import { foldersWidthAtom } from "../FoldersBar";
import { terminalHeightAtom } from "../Terminal/useTerminal";

export default function File() {
  const [ terminalHeight,  ] = useAtom(terminalHeightAtom);
  const [ browserWidth,  ] = useAtom(BrowserWidthAtom);
  const [ foldersWidth,  ] = useAtom(foldersWidthAtom);

  return (
    <div 
      className="bg-[#202024]"
      style={{
        // height: `calc(100vh - ${terminalHeight}px - 24px)`,
        // width: `calc(100vw - ${browserWidth}px - ${foldersWidth}px)`,
        // left: `${foldersWidth}px`,
        // top: '24px'
      }}
    >
      File
    </div>
  )
}
