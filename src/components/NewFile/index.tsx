import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';
import CodeMirror from "@uiw/react-codemirror";
import ANSIToHTML from 'ansi-to-html';
import { useState } from 'react';
import { getWebContainerInstance } from '../../lib/webContainer';
import './styles.css';

const initialCode = [
  `import 'isomorphic-fetch';`,
  ``,
  `const fetchRepositories = async () => {
    await fetch("https://api.github.com/users/verdant31/repos?page=1&per_page=5")
      .then(res => res.json())
      .then(res => console.log(res))
  }`,
  ``,
  `fetchRepositories();`,
].join('\n')

const ANSIConverter = new ANSIToHTML()

export function NewFile() {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState<string[]>([])

  const handleRunCode =  async () => {
    const webContainer = await getWebContainerInstance()

    await webContainer.mount({
      'index.js': {
        file: {
          contents: code,
        },
      },
      'package.json': {
        file: {
          contents: `
            {
              "name": "example-app",
              "type": "module",
              "dependencies": {
                "chalk": "latest",
                "isomorphic-fetch": "latest"
              },
              "scripts": {
                "start": "node index.js"
              }
            }
          `.trim(),
        },
      },
    })

    const install = await webContainer.spawn('pnpm', ['i'], {
      output: false,
    })
    setOutput(['🔥 Installing dependencies!'])

    install.output.pipeTo(
      new WritableStream({
        write(data) {
          setOutput((state) => [...state, ANSIConverter.toHtml(data)])
        },
      }),
    )
    await install.exit

    setOutput((state) => [...state, '---------', '🚀 Running the application!'])

    const start = await webContainer.spawn('pnpm', ['start'])

    start.output.pipeTo(
      new WritableStream({
        write(data) {
          setOutput((state) => [...state, ANSIConverter.toHtml(data)])
        },
      }),
    )
  }

  return (
    <div className="w-full px-12 m-auto ">
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