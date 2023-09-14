import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/ui/Layout'
import DeckItemPage from './pages/deck-item-page/DeckItemPage'
import HomePage from './pages/home/HomePage'
import LoginPage from './pages/login/LoginPage'
import SignUpPage from './pages/sign-up/SignUpPage'

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/decks/:deckID" element={<DeckItemPage />} />
      </Route>
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/log-in" element={<LoginPage />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
