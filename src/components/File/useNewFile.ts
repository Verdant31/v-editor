import ANSIToHTML from 'ansi-to-html';
import { useAtomValue, useSetAtom } from 'jotai/react';
import { useEffect, useState } from 'react';
import { getWebContainerInstance } from '../../lib/webContainer';
import { filesAtom } from '../../store/files';
import { fetchAndUpdateFile } from '../../store/files/utils';
import './styles.css';

const ANSIConverter = new ANSIToHTML()

interface useNewFile {
  previusCode: string;
  name: string;
}

export function useNewFile({ previusCode, name }: useNewFile) {
  const setFile = useSetAtom(filesAtom);
  const files = useAtomValue(filesAtom);
  
  const [code, setCode] = useState(previusCode)
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

  useEffect(() => {
    fetchAndUpdateFile({ files, setFile, code, fileName: name });
  },[output])

  return {
    code,
    setCode,
    handleRunCode,
    output,
  }
}