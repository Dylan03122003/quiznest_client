import { Navigate, Route, Routes } from 'react-router-dom'
import TestComponent from './components/TestComponent'
import Layout from './components/ui/Layout'
import DeckDetailPage from './pages/deck-detail/DeckDetailPage'
import HomePage from './pages/home/HomePage'
import LoginPage from './pages/login/LoginPage'
import SignUpPage from './pages/sign-up/SignUpPage'

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/decks/:deckID" element={<DeckDetailPage />} />
          <Route path="/posts" element={<HomePage />} />
          <Route path="/test" element={<TestComponent />} />
        </Route>
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/log-in" element={<LoginPage />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App
