import { Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import HomePage from './pages/home/HomePage'
import LoginPage from './pages/login/LoginPage'
import SignUpPage from './pages/sign-up/SignUpPage'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="sign-up" element={<SignUpPage />} />
        <Route path="log-in" element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App
