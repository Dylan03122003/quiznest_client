import { Route, Routes } from 'react-router-dom'
import Layout from './components/ui/Layout'
import HomePage from './pages/home/HomePage'
import LoginPage from './pages/login/LoginPage'
import SignUpPage from './pages/sign-up/SignUpPage'

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      <Route path="sign-up" element={<SignUpPage />} />
      <Route path="log-in" element={<LoginPage />} />
    </Routes>
  )
}

export default App
