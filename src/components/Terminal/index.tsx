interface TerminalProps {
  output: string[];
}

export function Terminal({ output } : TerminalProps) {

  return (
    <div className="w-[100%] absolute bottom-0 left-0 h-44 bg-[#202024]">
      <h1 className="bg-[#151518] font-monospace p-2 px-4">Terminal</h1>
      <div className="flex bg-[#202024]">
        {output.length > 0 &&  (
          <div className="font-monospace text-xs leading-loose p-4">
            {output.map((line) => {
              return <p key={line} dangerouslySetInnerHTML={{ __html: line }} />
            })}
          </div>
        )}
      </div>
    </div>
  )
}