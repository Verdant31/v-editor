import interact from 'interactjs';
import { Lightning } from 'phosphor-react';
import './index.css';
import { useProject } from './useProject';

export function Project() {
  const { handleRunProject, output } = useProject();
  interact('.resizable')
  .resizable({
    edges: { top: true, left: true, bottom: true, right: true },
    listeners: {
      move: function (event) {
        let { x, y } = event.target.dataset

        x = (parseFloat(x) || 0) + event.deltaRect.left
        y = (parseFloat(y) || 0) + event.deltaRect.top

        Object.assign(event.target.style, {
          width: `${event.rect.width}px`,
          height: `${event.rect.height}px`,
          transform: `translate(${x}px, ${y}px)`
        })

        Object.assign(event.target.dataset, { x, y })
      }
    }
  })

  return (
    <main className="flex  px-24">
      <button className="flex gap-2 justify-center items-center absolute top-10 right-10 h-10 bg-[#8257e5] rounded-md w-24 hover:scale-105 toransition-all duration-300" onClick={handleRunProject}> 
        <p className="text-lg">Run</p>
        <Lightning size={24} weight="fill" />
      </button>
      {output.length > 0 &&  (
        <div className="font-monospace text-xs leading-loose mt-12">
          {output.map((line) => {
            return <p key={line} dangerouslySetInnerHTML={{ __html: line }} />
          })}
        </div>
      )}
      <iframe className="resizable" style={{boxSizing: 'border-box'}} width="100%" height="100%"  src="" />
    </main>
  )
}
