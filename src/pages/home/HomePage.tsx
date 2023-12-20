import { useAuth } from '@clerk/clerk-react'
import DeckList from './DeckList'

const HomePage = () => {
  const { isSignedIn } = useAuth()

  return (
    <div className="p-2 h-screen bg-primary-light dark:bg-primary-dark">
      {isSignedIn && <DeckList />}
    </div>
  )
}

export default HomePage
