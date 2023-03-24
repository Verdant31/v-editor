import { appCss, appTsx, indexCss, indexHtml, logoSvg, mainTsx, packagejson, routesTsx, tsConfig, viteConfig, viteSvg } from "./files"

export const viteTree = {
  src: {
    directory: {
      assets: {
        directory: {
          'react.svg': {
            file: {
              contents: logoSvg
            },
          },
        }
      },
      routes: {
        directory: {
          'index.tsx': {
            file: {
              contents: routesTsx
            },
          },
        }
      },
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
    },
  },
  public: {
    directory: {
      'vite.svg': {
        file: {
          contents: viteSvg
        },
      },
    },
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