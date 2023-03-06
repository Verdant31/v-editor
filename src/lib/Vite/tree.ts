import { appCss, appTsx, indexCss, indexHtml, logoSvg, mainTsx, packagejson, tsConfig, viteConfig } from "./files"

export const viteTree = {
  src: {
    directory: {
      'App.tsx': {
        file: {
          contents: appTsx,
        },
      },
      'main.tsx': {
        file: {
          contents: mainTsx,
        }
      },
      'index.css': {
        file: {
          contents: indexCss,
        },
      },
      'App.css': {
        file: {
          contents: appCss,
        },
      },
      'logo.svg': {
        file: {
          contents: logoSvg,
        },
      },
    }
  },
  'index.html': {
    file: {
      contents: indexHtml,
    },
  },
  'package.json': {
    file: {
      contents: packagejson,
    },
  },
  'tsconfig.json': {
    file: {
      contents: tsConfig,
    },
  },
  'vite.config.ts': {
    file: {
      contents: viteConfig,
    },
  },
}