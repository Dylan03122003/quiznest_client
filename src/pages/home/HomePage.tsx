import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import DeckList from './DeckList'

const HomePage = () => {
  const { currentUser } = useSelector((state: RootState) => state.authState)

  return (
    <div className="p-2 h-screen bg-primary-light dark:bg-primary-dark">
      {currentUser && <DeckList />}
    </div>
  )
}

export default HomePage
