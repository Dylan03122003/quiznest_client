import { useQuery, useQueryClient } from 'react-query'
import { QUERY_KEYS, getChildrenDecks, getDeckDetail } from '../api/deck'
import { Deck } from '../slices/deck/deckTypes'

export const useDeckQuery = (deckID: string) => {
  return useQuery<{ data: Deck }>(
    [QUERY_KEYS.DECKS, deckID],
    () => getDeckDetail(deckID),
    {
      enabled: !!deckID,
    },
  )
}

export const useChildDecksQuery = (
  parentDeckID: string | null,
  useFor?: 'toggle_deck' | 'deck_path',
) => {
  const queryClient = useQueryClient()
  return useQuery<{ data: Deck[] }>({
    queryKey: ['decks', { parentDeckID: parentDeckID }],
    queryFn: () => getChildrenDecks(parentDeckID),
    onSuccess(data) {
      if (useFor !== 'toggle_deck') return
    },
  })
}
