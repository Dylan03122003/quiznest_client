import { Navigate, Route, Routes } from 'react-router-dom'
import TestComponent from './components/TestComponent'
import TestComponent2 from './components/TestComponent2'
import Layout from './components/ui/Layout'
import DeckDetailPage from './pages/deck-detail/DeckDetailPage'
import HomePage from './pages/home/HomePage'
import LoginPage from './pages/login/LoginPage'
import LoginTest from './pages/login/LoginTest'
import SignUpPage from './pages/sign-up/SignUpPage'
import SignUpTest from './pages/sign-up/SignUpTest'

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/decks/:deckID" element={<DeckDetailPage />} />
          <Route path="/posts" element={<HomePage />} />
          <Route path="/test" element={<TestComponent />} />
          <Route path="/test2" element={<TestComponent2 />} />
        </Route>

        {/* <Route path="/decks/revision/:deckID" element={<DeckRevisionPage />} /> */}

        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/log-in" element={<LoginPage />} />
        {/* Clerk test START */}
        <Route path="/sign-in/*" element={<LoginTest />} />
        <Route path="/register/*" element={<SignUpTest />} />
        {/* Clerk test END */}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App
