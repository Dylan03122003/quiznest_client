import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { getAllDecks } from '../../api/deck'

interface AllDecksResponse {
  decks: {
    _id: string
    title: string
    userID: string
  }[]
}

const DeckList = () => {
  const { data } = useQuery<AllDecksResponse>({
    queryKey: ['decks'],
    queryFn: getAllDecks,
  })

  return (
    <ul className="flex gap-5 justify-center items-center">
      {data?.decks.map((deck) => (
        <li
          key={deck._id}
          className="p-4 bg-blue-50 text-blue-600 w-fit rounded-md"
        >
          <Link to={`/decks/${deck._id}`}>
            <h2>{deck.title}</h2>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default DeckList
