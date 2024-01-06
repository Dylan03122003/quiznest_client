import { ClerkProvider } from '@clerk/clerk-react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import store from './store.ts'

const queryClient = new QueryClient()
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <BrowserRouter>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </Provider>
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>,
)
