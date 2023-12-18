import { useQuery, useQueryClient } from 'react-query'
import { QUERY_KEYS, getChildrenDecks, getDeckDetail } from '../api/deck'
import { Deck } from '../types/deckTypes'
import { appendDeck } from '../util/deck'

export const useDeckQuery = (deckID: string) => {
  return useQuery<{ data: Deck }>(
    [QUERY_KEYS.DECKS, deckID],
    () => getDeckDetail(deckID),
    {
      enabled: !!deckID,
    },
  )
}

export const useChildDecksQuery = (parentDeckID: string | null) => {
  return useQuery<{ data: Deck[] }>({
    queryKey: ['decks', { parentDeckID: parentDeckID }],
    queryFn: () => getChildrenDecks(parentDeckID),
  })
}

export const useToggleDecksQuery = (parentDeckID: string | null) => {
  const queryClient = useQueryClient()

  return useQuery<{ data: Deck[] }>({
    queryKey: ['toggle_decks'],
    queryFn: () => getChildrenDecks(parentDeckID),
    onSuccess(data) {
      const childDecks = data.data

      const prevData = queryClient.getQueryData<{ data: Deck[] }>([
        'toggle_decks',
      ])
      const prevDecks = prevData?.data || []
      const newDecks = appendDeck(prevDecks, childDecks, parentDeckID || '')
      newDecks
      // console.log('child_decks: ', childDecks)
      // console.log('newDecks: ', newDecks)
    },
  })
}
