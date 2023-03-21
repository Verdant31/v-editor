import { Item, Menu, Separator } from 'react-contexify';
import "react-contexify/dist/ReactContexify.css";

interface RootFilesContextMenuProps {
  startFileCreating: () => void;
}

export function RootFilesContextMenu({ startFileCreating }: RootFilesContextMenuProps) {
  return (
    <Menu id="menu_id" className="bg-[#8257e5]">
      <Item onClick={startFileCreating}>
        <p className="font-monospace text-zinc-100">New file</p>
      </Item>
      <Separator  />
      <Item>
        <p className="font-monospace text-zinc-100">New folder</p>
      </Item>
    </Menu>
  )
}
