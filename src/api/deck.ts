import { AxiosError } from 'axios'
import { InputQuestion } from '../components/form/question_form/QuestionForm'
import { apiInstance } from './config'

export enum QUERY_KEYS {
  DECKS = 'decks',
  USERS = 'users',
}

export const getDecks = async () => {
  const response = await apiInstance.get(`/api/decks`)
  return response.data
}

export const getChildrenDecks = async (parentDeckID: string | null) => {
  // if (!parentDeckID) {
  //   const response = await apiInstance.get(`/api/decks`)
  //   return response.data
  // }
  const response = await apiInstance.get(
    `/api/decks/children-decks/${parentDeckID}`,
  )
  return response.data
}

export const createDeck = async ({
  title,
  parentDeckID,
}: {
  title: string
  parentDeckID: string | null
}) => {
  const response = await apiInstance.post(`/api/decks`, { title, parentDeckID })
  return response.data
}

export const createQuestionForAnAvailableDeck = async ({
  deckID,
  inputQuestion,
}: {
  deckID: string
  inputQuestion: InputQuestion
}) => {
  try {
    const response = await apiInstance.post(`/api/decks/${deckID}`, {
      question: inputQuestion,
    })
    return response.data
  } catch (error) {
    const err = error as AxiosError
    console.log('ERROR: ', err.response?.data)
  }
}

export const changeParentDeckID = async ({
  parentDeckID,
  childDeckID,
}: {
  parentDeckID: string | null
  childDeckID: string
}) => {
  try {
    const reponse = await apiInstance.post('/api/decks/change-parent', {
      parentDeckID,
      childDeckID,
    })
    return reponse.data
  } catch (error) {
    const err = error as AxiosError
    console.log('ERROR: ', err.response?.data)
  }
}

export const deleteDeck = async (deckID: string) => {
  try {
    const reponse = await apiInstance.delete(`/api/decks/${deckID}`)
    return reponse.data
  } catch (error) {
    const err = error as AxiosError
    console.log('ERROR: ', err.response?.data)
  }
}

export const updateDeckTitle = async ({
  deckID,
  title,
}: {
  deckID: string
  title: string
}) => {
  try {
    const reponse = await apiInstance.patch(`/api/decks/${deckID}`, { title })
    return reponse.data
  } catch (error) {
    const err = error as AxiosError
    console.log('ERROR: ', err.response?.data)
  }
}

export const getDeckDetail = async (deckID: string) => {
  try {
    const reponse = await apiInstance.get(`/api/decks/${deckID}`)
    return reponse.data
  } catch (error) {
    const err = error as AxiosError
    console.log('ERROR: ', err.response?.data)
  }
}
