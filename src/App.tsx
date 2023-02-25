import { useAtomValue } from "jotai";
import { File } from "./components/File";
import { filesAtom } from "./store/files";

export default function Home() {
  const files = useAtomValue(filesAtom);
  const current = files.find((file) => file.current);
  
  if(!current) return <h1>Loading...</h1>

  return (
    <main className="mt-24">
      {files.map((file) => (
        <h1 key={file.name}>{file.name}</h1>
      ))}
      <File name={current.name} previusCode={current.code} />
    </main>
  )
}
