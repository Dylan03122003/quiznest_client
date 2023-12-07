import { useParams } from 'react-router-dom'

export default function DeckDetailPage() {
  const { deckID } = useParams()

  return <div>{deckID}</div>
}
