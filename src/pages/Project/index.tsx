import { useProject } from './useProject';

export function Project() {
  const { handleRunProject, output } = useProject();
  
  return (
    <main className="flex justify-between">
      <button onClick={handleRunProject}> Run react project</button>
      {output.length > 0 &&  (
        <div className="font-monospace text-xs leading-loose mt-12">
          {output.map((line) => {
            return <p key={line} dangerouslySetInnerHTML={{ __html: line }} />
          })}
        </div>
      )}
      <iframe src="" width={800} height={800}  />
    </main>
  )
}
