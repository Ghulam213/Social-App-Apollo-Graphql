import { AuthProvider } from './context/auth'

import AppRoutes from './AppRoutes'

import 'semantic-ui-css/semantic.min.css'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App
