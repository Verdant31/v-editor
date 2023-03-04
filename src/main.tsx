import { Provider } from 'jotai/react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ProjectContextProvider } from './contexts/ProjectContext'
import './index.css'
import { filesStore } from './store/files'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ProjectContextProvider>
    <Provider store={filesStore}>
      <App />
    </Provider>
  </ProjectContextProvider>
)
