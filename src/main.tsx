import { Provider } from 'jotai/react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { filesStore } from './store/files'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={filesStore}>
    <App />
  </Provider>
)
