import ANSIToHTML from 'ansi-to-html';
import { useState } from 'react';
import { getWebContainerInstance } from '../../lib/webContainer';
import './styles.css';
import { initialCode } from './utils';

const ANSIConverter = new ANSIToHTML()

export function useNewFile() {
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

  return {
    code,
    setCode,
    handleRunCode,
    output,
  }
}