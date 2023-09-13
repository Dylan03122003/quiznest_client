import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../store'

// interface AllDecksResponse {
//   decks: {
//     _id: string
//     title: string
//     userID: string
//   }[]
// }

// ? When refreshing the page all decks was disappeared

const DeckList = () => {
  const { decks } = useSelector((state: RootState) => state.deckState)

  return (
    <ul>
      {decks?.map((deck) => (
        <li key={deck._id} className="p-4 bg-blue-50 text-blue-400 w-fit">
          <Link to={`/`}>
            <h2>{deck.title}</h2>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default DeckList
