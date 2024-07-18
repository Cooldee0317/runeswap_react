import './App.css'
import Layout from './layout'
import AppRoutes from './routes'
import { WalletStandardProvider } from '@wallet-standard/react'
function App() {
  return (
    <WalletStandardProvider>
      <Layout>
        <AppRoutes />
      </Layout>
    </WalletStandardProvider>
  )
}

export default App
