import { NewCard, NewDeck } from '../slices/deck/deckTypes'
import { apiInstance } from './config'

// GET
export const getAllDecks = async () => {
  const response = await apiInstance.get('/api/decks')
  return response.data
}

// POST

export const createDeck = async (newDeck: NewDeck) => {
  const response = await apiInstance.post('/api/decks', newDeck)
  return response.data
}

export const addCardToExistingDeck = async ({
  card,
  deckID,
}: {
  card: NewCard
  deckID: string
}) => {
  const response = await apiInstance.post('/api/decks/add-card', {
    ...card,
    deckID,
  })
  return response.data
}
