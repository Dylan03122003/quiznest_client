import { AxiosError } from 'axios'
import { InputQuestion } from '../components/form/question_form/QuestionForm'
import { apiInstance } from './config'

export enum QUERY_KEYS {
  DECKS = 'decks',
  USERS = 'users',
  TOKEN = 'token',
}

export const getDecks = async (token: string) => {
  const response = await apiInstance.get(`/api/decks`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      mode: 'cors',
    },
  })
  if (response.statusText !== 'OK') throw new Error('Something went wrong!')

  return response.data
}

export const getChildrenDecks = async (
  parentDeckID: string | null,
  token: string | null,
) => {
  if (!token) return
  const response = await apiInstance.get(
    `/api/decks/children-decks/${parentDeckID}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        mode: 'cors',
      },
    },
  )
  return response.data
}

export const createDeckAPI = async ({
  title,
  parentDeckID,
  token,
}: {
  title: string
  parentDeckID: string | null
  token: string
}) => {
  if (!token) return

  const response = await apiInstance.post(
    `/api/decks`,
    { title, parentDeckID },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        mode: 'cors',
      },
    },
  )
  return response.data
}

export const createQuestionForAnAvailableDeck = async ({
  deckID,
  inputQuestion,
  token,
}: {
  deckID: string
  inputQuestion: InputQuestion
  token: string
}) => {
  try {
    const response = await apiInstance.post(
      `/api/decks/${deckID}`,
      {
        question: inputQuestion,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          mode: 'cors',
        },
      },
    )
    return response.data
  } catch (error) {
    const err = error as AxiosError
    console.log('ERROR: ', err.response?.data)
  }
}

export const changeParentDeckID = async ({
  parentDeckID,
  childDeckID,
  token,
}: {
  parentDeckID: string | null
  childDeckID: string
  token: string
}) => {
  try {
    const reponse = await apiInstance.post(
      '/api/decks/change-parent',
      {
        parentDeckID,
        childDeckID,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          mode: 'cors',
        },
      },
    )
    return reponse.data
  } catch (error) {
    const err = error as AxiosError
    console.log('ERROR: ', err.response?.data)
  }
}

export const deleteDeck = async ({
  deckID,
  token,
}: {
  deckID: string
  token: string
}) => {
  try {
    const reponse = await apiInstance.delete(`/api/decks/${deckID}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        mode: 'cors',
      },
    })
    return reponse.data
  } catch (error) {
    const err = error as AxiosError
    console.log('ERROR: ', err.response?.data)
  }
}

export const updateDeckTitle = async ({
  deckID,
  title,
  token,
}: {
  deckID: string
  title: string
  token: string
}) => {
  try {
    const reponse = await apiInstance.patch(
      `/api/decks/${deckID}`,
      { title },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          mode: 'cors',
        },
      },
    )
    return reponse.data
  } catch (error) {
    const err = error as AxiosError
    console.log('ERROR: ', err.response?.data)
  }
}

export const getDeckDetail = async (deckID: string, token: string) => {
  if (!token) {
    console.error('Token is missing.')
    return null
  }

  const reponse = await apiInstance.get(`/api/decks/${deckID}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.trim()}`,
      mode: 'cors',
    },
  })

  if (reponse.statusText !== 'OK') throw new Error('Something went wrong!')
  return reponse.data
}
