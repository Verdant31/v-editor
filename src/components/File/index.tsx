import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';
import CodeMirror from "@uiw/react-codemirror";
import './styles.css';
import { useNewFile } from './useNewFile';

interface FileProps {
  name: string;
  previusCode: string;
}

export function File({name, previusCode } : FileProps) {
  const { code, handleRunCode, output, setCode } = useNewFile({previusCode, name});

  return (
    <div className="w-full px-12 m-auto ">
      <h1>{name}</h1>
      <CodeMirror
        value={code}
        placeholder="Start coding..."
        extensions={[javascript({ jsx: true })]}
        theme={dracula}
        onChange={(event) => setCode(event)}
      />
       {output.length > 0 ? (
          <div className="font-monospace text-xs leading-loose mt-12">
            {output.map((line) => {
              return <p key={line} dangerouslySetInnerHTML={{ __html: line }} />
            })}
          </div>
        ) : (
          <span className="text-zinc-400">
            Click on run to evaluate the code.
          </span>
        )}
      <button onClick={handleRunCode}>Run</button>
    </div>
  )
}