import { Item, Menu, Separator } from 'react-contexify';
import "react-contexify/dist/ReactContexify.css";

interface FilesContextMenuProps {
  handleStartRenamingProcess: (path: string) => void;
  handleDeleteFile: (path: string) => void;
  id: string;
}

export function FilesContextMenu({ handleStartRenamingProcess, handleDeleteFile,  id }: FilesContextMenuProps) {
  return (
    <Menu id={id} className="bg-[#8257e5]">
      <Item onClick={({props}) => handleStartRenamingProcess(props)}>
        <p className="font-monospace text-zinc-100">Rename file</p>
      </Item>
      <Separator  />
      <Item onClick={(({props}) => handleDeleteFile(props))}>
        <p className="font-monospace text-zinc-100">Delete file</p>
      </Item>
    </Menu>
  )
}
