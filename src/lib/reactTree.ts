
export const tree = {
  src: {
    directory: {
      'index.js': {
        file: {
          contents: `
            import { render } from 'react-dom';
            import { App } from './App';
            
            render(<App />, document.getElementById('root'));
          `
        },
      },
      'App.js': {
        file: {
          contents: `import React from 'react';

          export function App() {
            return (
              <div>
                <h1>Hello World</h1>
              </div>
            );
          }
          `
        }
      }
    }
  },
  public: {
    directory: {
      'index.html': {
        file: {
          contents: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Document</title>
            </head>
            <body>
              <div id="root"></div>
            </body>
          </html>
          ` 
        },
      }
    }
  },
  'babel.config.json': {
    file: {
      contents: `module.exports = {
        presets: [
          "@babel/preset-env", 
          ["@babel/preset-react",
          {
            runtime: "automatic"
          }]
        ]
      }`,
    }
  },
  'webpack.config.js': {
    file: {
      contents: `
      const path = require('path');
      const HtmlWebpackPlugin = require('html-webpack-plugin');
      
      module.exports = {
        mode: 'development',
        entry: path.resolve(__dirname, 'src', 'index.js'),
        output: {
          path: path.resolve(__dirname, 'dist'),
          filename: 'bundle.js',
        },
        resolve: {
          extensions: ['.js', '.jsx'],
        },
        plugins:[
          new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
          })
        ],
        devServer: {
          static: path.resolve(__dirname, 'public')
        },
        module: {
          rules: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: 'babel-loader', 
            }
          ]
        }
      }
      `.trim(),
    }
  },
  'package.json': {
    file: {
      contents: `
        {
          "name": "example-app",
          "license": "MIT",
          "dependencies": {
            "react": "latest",
            "react-dom": "latest",
            "@babel/cli": "latest",
            "@babel/core": "latest",
            "@babel/preset-env": "latest",
            "@babel/preset-react": "latest",
            "babel-loader": "latest",
            "webpack-cli": "latest",
            "webpack-dev-server": "latest"
          },
          "scripts": {
            "start": "webpack serve --config webpack.config.js"
          }
        }
      `.trim(),
    },
  },
};