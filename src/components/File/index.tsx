import CodeEditor from '@uiw/react-textarea-code-editor';
import './styles.css';
import { useFile } from './useFile';

export default function File() {
  const { currentFile, openedFiles, setOpenedFiles } = useFile();
  return (
    <div className="overflow-auto h-full mt-10">
      <CodeEditor
        value={currentFile?.code}
        language={currentFile?.extension}
        onChange={(event) => {
          const newFiles = openedFiles.map(file => {
            if (file.completePath === currentFile?.completePath) {
              return {
                ...file,
                code: event.target.value,
              }
            }
            return file
          })
          setOpenedFiles(newFiles)
        }}
        minHeight={80}
        padding={20}
        spellCheck={false}
        className="text-sm bg-[#191622] font-monospace rounded"
      />
    </div>
  )
}

{/* <div className="mx-auto text-center w-72">
<h1 className="font-monospace">Your project is all set up, just pick a file and start coding.</h1>
<h1 className="font-monospace mt-2">Enjoy our editor!</h1>
</div> */}