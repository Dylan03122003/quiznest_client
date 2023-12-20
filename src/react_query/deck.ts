import { useAuth } from '@clerk/clerk-react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  QUERY_KEYS,
  changeParentDeckID,
  getChildrenDecks,
  getDeckDetail,
  getDecks,
} from '../api/deck'
import { Deck } from '../types/deckTypes'

export const useGetAllDecksQuery = () => {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: QUERY_KEYS.DECKS,
    queryFn: async () => {
      const token = await getToken()
      return getDecks(token || '')
    },
  })
}

export const useDeckQuery = (deckID: string) => {
  const { getToken } = useAuth()

  return useQuery<{ data: Deck }>(
    [QUERY_KEYS.DECKS, deckID],
    async () => {
      const token = await getToken()
      return await getDeckDetail(deckID, token || '')
    },
    {
      enabled: !!deckID,
    },
  )
}

export const useChildDecksQuery = (
  parentDeckID: string | null,
  token: string,
) => {
  return useQuery<{ data: Deck[] }>({
    queryKey: ['decks', { parentDeckID: parentDeckID }],
    queryFn: () => getChildrenDecks(parentDeckID, token),
    enabled: !!token,
  })
}

export const useChangeParentDeckMutation = () => {
  const queryClient = useQueryClient()
  const { getToken } = useAuth()

  return useMutation({
    mutationFn: async ({
      childDeckID,
      parentDeckID,
    }: {
      childDeckID: string
      parentDeckID: string | null
    }) => {
      const token = await getToken()
      changeParentDeckID({ childDeckID, parentDeckID, token: token || '' })
    },
    onMutate: async ({
      parentDeckID,
      childDeckID,
    }: {
      parentDeckID: string | null
      childDeckID: string
    }) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.DECKS] })

      const prevData = queryClient.getQueryData<{ data: Deck[] }>(
        QUERY_KEYS.DECKS,
      )
      const prevDecks = prevData ? prevData.data : []
      console.log(prevDecks, parentDeckID, childDeckID)

      return { prevData }
    },
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEYS.DECKS])
    },
  })
}
