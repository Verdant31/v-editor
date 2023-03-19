import { Item, Menu, Separator } from 'react-contexify';
import "react-contexify/dist/ReactContexify.css";

interface FoldersContextMenuProps {
  handleStartRenamingProcess: (props: any) => void;
}

export function FoldersContextMenu({ handleStartRenamingProcess }: FoldersContextMenuProps) {
  return (
    <Menu id="foldersMenu" className="bg-[#8257e5]">
      <Item onClick={({props}) => handleStartRenamingProcess(props)}>
        <p className="font-monospace text-zinc-100">Rename file</p>
      </Item>
      <Separator  />
      <Item>
        <p className="font-monospace text-zinc-100">Delete file</p>
      </Item>
    </Menu>
  )
}
