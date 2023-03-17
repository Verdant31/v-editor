import { Item, Menu, Separator } from 'react-contexify';
import "react-contexify/dist/ReactContexify.css";

interface ContextMenuProps {
  startFileCreating: () => void;
}

export function ContextMenu({ startFileCreating }: ContextMenuProps) {
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
