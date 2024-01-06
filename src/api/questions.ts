import { AxiosError } from 'axios'
import { Question } from '../types/deckTypes'
import { apiInstance } from './config'

export const updateCard = async ({
  cardID,
  updatedQuestion,
  token,
}: {
  cardID: string
  updatedQuestion: Question
  token: string
}) => {
  try {
    const response = await apiInstance.patch(
      `/api/questions/cards/${cardID}`,
      {
        updatedQuestion,
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

export const deleteQuestionAPI = async (questionID: string, token: string) => {
  try {
    const response = await apiInstance.delete(`/api/questions/${questionID}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        mode: 'cors',
      },
    })
    return response.data
  } catch (error) {
    const err = error as AxiosError
    console.log('ERROR: ', err.response?.data)
  }
}

export const bookmarkQuestionAPI = async (
  questionID: string,
  token: string,
) => {
  try {
    const response = await apiInstance.get(
      `/api/questions/${questionID}/bookmark`,
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
