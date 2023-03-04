/** @type {import('@webcontainer/api').FileSystemTree} */

export const viteTree = {
  src: {
    directory: {
      'App.tsx': {
        file: {
          contents: `
          import React from 'react';
          function App() {
            return (
              <div className="App">
                <p>opa fion</p>
              </div>
            )
          }
          export default App`
        },
      },
      'main.tsx': {
        file: {
          contents: `
          import React from 'react'
          import ReactDOM from 'react-dom/client'
          import App from './App'
          ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
            <App />
          )
          `
        }
      }
    }
  },
  'index.html': {
    file: {
      contents: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Vite App</title>
      </head>
      <body>
        <div id="root"></div>
        <script type="module" src="/src/main.tsx"></script>
      </body>
      </html>
      `,
    }
  },
  'package.json': {
    file: {
      contents: `{
        "name": "myapp",
        "version": "0.0.0",
        "scripts": {
          "dev": "vite",
          "build": "tsc && vite build"
        },
        "dependencies": {
          "react": "latest",
          "react-dom": "latest"
        },
        "devDependencies": {
          "@types/react": "latest",
          "@types/react-dom": "latest",
          "typescript": "^4.1.2",
          "vite": "^1.0.0-rc.13",
          "vite-plugin-react": "^4.0.0"
        }
      }
      `,
    }
  },
  'tsconfig.json': {
    file: {
      contents: `
      {
        "compilerOptions": {
          "target": "ESNext",
          "lib": ["DOM", "DOM.Iterable", "ESNext"],
          "types": [],
          "allowJs": false,
          "skipLibCheck": false,
          "esModuleInterop": false,
          "allowSyntheticDefaultImports": true,
          "strict": true,
          "forceConsistentCasingInFileNames": true,
          "module": "ESNext",
          "moduleResolution": "Node",
          "resolveJsonModule": true,
          "isolatedModules": true,
          "noEmit": true,
          "jsx": "react"
        },
        "include": ["src"]
      }
      `
    },
  },
  'vite.config.ts': {
    file: {
      contents: `
      import * as reactPlugin from 'vite-plugin-react'
      import type { UserConfig } from 'vite'
      
      const config: UserConfig = {
        jsx: 'react',
        optimizeDeps: {
          include: ['react', 'react-dom/client'],
        },
        plugins: [reactPlugin]
      }
      
      export default config
      
      `
    },
  },
};