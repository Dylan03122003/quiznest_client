import { useAuth } from '@clerk/clerk-react'
import { useMutation, useQueryClient } from 'react-query'
import { QUERY_KEYS, createQuestionForAnAvailableDeck } from '../api/deck'
import { deleteQuestionAPI, updateCard } from '../api/questions'
import { StateAfterCreate } from '../components/form/question_form/QuestionForm'
import { Deck, Question } from '../types/deckTypes'

export const useUpdateCardMutation = (
  oldQuestion: Question,
  onClose?: () => void,
) => {
  const queryClient = useQueryClient()
  const { getToken } = useAuth()
  return useMutation({
    mutationFn: async ({
      cardID,
      updatedQuestion,
    }: {
      cardID: string
      updatedQuestion: Question
    }) => {
      const token = await getToken()
      updateCard({ cardID, updatedQuestion, token: token || '' })
    },
    onMutate: async (data: { updatedQuestion: Question }) => {
      onClose && onClose()

      await queryClient.cancelQueries({
        queryKey: [QUERY_KEYS.DECKS, oldQuestion.deckID],
      })
      const prevData = queryClient.getQueryData<{ data: Deck }>([
        QUERY_KEYS.DECKS,
        oldQuestion.deckID,
      ])

      const newQuestions = prevData?.data.questions.map((question) => {
        if (question.questionID === oldQuestion.questionID) {
          return data.updatedQuestion
        }
        return question
      })

      const newData = {
        ...prevData,
        data: {
          ...prevData?.data,
          questions: newQuestions,
        },
      }

      queryClient.setQueryData([QUERY_KEYS.DECKS, oldQuestion.deckID], newData)

      return { prevData }
    },
    onSuccess: async () => {
      //TODO: Show toast
    },
    onError(_, __, context) {
      queryClient.setQueryData(
        [QUERY_KEYS.DECKS, oldQuestion.deckID],
        context?.prevData,
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.DECKS, oldQuestion.deckID],
      })
    },
  })
}

export const useDeleteQuestionMutation = (
  onClose: () => void,
  deckID: string,
) => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (questionID: string) => {
      const token = await getToken()
      deleteQuestionAPI(questionID, token || '')
    },
    onMutate: async (questionID: string) => {
      onClose()

      await queryClient.cancelQueries({
        queryKey: [QUERY_KEYS.DECKS, deckID],
      })
      const prevData = queryClient.getQueryData<{ data: Deck }>([
        QUERY_KEYS.DECKS,
        deckID,
      ])

      const newQuestions = prevData?.data.questions.filter(
        (question) => question.questionID !== questionID,
      )

      const newData = {
        ...prevData,
        data: {
          ...prevData?.data,
          questions: newQuestions,
        },
      }

      queryClient.setQueryData([QUERY_KEYS.DECKS, deckID], newData)

      return { prevData }
    },
    onSuccess() {
      console.log('delete question successfully')
    },
    onError(_, __, context) {
      queryClient.setQueryData([QUERY_KEYS.DECKS, deckID], context?.prevData)
      console.log('delete question failed')
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.DECKS, deckID],
      })
    },
  })
}

interface AddQuestionMutationProps {
  setStateAfterCreate: (stateAfterCreate: StateAfterCreate) => void
  deckID: string
}

export const useAddQuestionMutation = ({
  setStateAfterCreate,
  deckID,
}: AddQuestionMutationProps) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createQuestionForAnAvailableDeck,
    onSuccess() {
      setStateAfterCreate('success')
      console.log('create question successfully') // TODO: SHOW TOAST INSTEAD OF LOGGING
      queryClient.invalidateQueries([QUERY_KEYS.DECKS, deckID])
    },
    onError() {
      console.log('create question failed')
      setStateAfterCreate('fail')
    },
  })
}
