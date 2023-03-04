import { Provider } from 'jotai/react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import App from './App'
import './index.css'
import { filesStore } from './store/files'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={filesStore}>
      <App />
    </Provider>
  </QueryClientProvider>
)
