import { useAuth } from '@clerk/clerk-react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  QUERY_KEYS,
  changeParentDeckID,
  deleteDeck,
  getChildrenDecks,
  getDeckDetail,
  getDecks,
  updateDeckTitle,
} from '../api/deck'
import { Deck } from '../types/deckTypes'
import { findAndRemoveDeck, findAndUpdateTitle } from '../util/deck'

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

export const useUpdateDeckTitleMutation = (
  onCloseUpdate: (updatedDeck: null) => void,
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateDeckTitle,
    onMutate: async (updatedDeck: { deckID: string; title: string }) => {
      onCloseUpdate(null)

      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.DECKS] })

      const prevData = queryClient.getQueryData<{ data: Deck[] }>(
        QUERY_KEYS.DECKS,
      )
      const prevDecks = prevData?.data

      const updatedDecks = findAndUpdateTitle(
        prevDecks || [],
        updatedDeck.deckID,
        updatedDeck.title,
      )

      const updatedData = {
        ...prevData,
        data: updatedDecks,
      }
      queryClient.setQueryData([QUERY_KEYS.DECKS], updatedData)

      return { prevDecks }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData([QUERY_KEYS.DECKS], context?.prevDecks)
    },
    onSuccess() {
      console.log('Updated deck title successfully')
    },
    onSettled: () => {
      queryClient.invalidateQueries([QUERY_KEYS.DECKS])
    },
  })
}

export const useDeleteDeckMutation = (
  closeConfirmModal: (open: boolean) => void,
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteDeck,
    onMutate: async ({ deckID }) => {
      closeConfirmModal(false)

      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.DECKS] })

      const prevData = queryClient.getQueryData<{ data: Deck[] }>(
        QUERY_KEYS.DECKS,
      )

      const prevDecks = prevData?.data

      const updatedDecks = findAndRemoveDeck(prevDecks || [], deckID)

      const updatedData = {
        ...prevData,
        data: updatedDecks,
      }

      queryClient.setQueryData([QUERY_KEYS.DECKS], updatedData)

      return { prevData }
    },
    onError: (_, __, context) => {
      queryClient.setQueryData([QUERY_KEYS.DECKS], context?.prevData)
    },
    onSuccess() {
      console.log('Delete deck successfully')
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.DECKS],
      })
    },
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

// function deleteDeck(decks: Deck[], deckID: string): Deck[] {
//   const updatedDecks: Deck[] = decks.filter((deck) => {
//     if (deck.deckID === deckID) {
//       return false // Exclude the deck to delete
//     }

//     if (deck.childDecks && deck.childDecks.length > 0) {
//       // Recursively update childDecks
//       deck.childDecks = deleteDeck(deck.childDecks, deckID)
//     }

//     return true
//   })

//   return updatedDecks
// }

// function getDeckById(decks: Deck[], deckID: string): Deck | undefined {
//   for (const deck of decks) {
//     if (deck.deckID === deckID) {
//       return deck
//     }

//     if (deck.childDecks && deck.childDecks.length > 0) {
//       const childDeck = getDeckById(deck.childDecks, deckID)
//       if (childDeck) {
//         return childDeck
//       }
//     }
//   }

//   return undefined // Deck not found
// }
