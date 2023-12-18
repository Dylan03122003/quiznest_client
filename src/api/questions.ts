import { AxiosError } from 'axios'
import { Question } from '../types/deckTypes'
import { apiInstance } from './config'

export const updateCard = async ({
  cardID,
  updatedQuestion,
}: {
  cardID: string
  updatedQuestion: Question
}) => {
  try {
    const response = await apiInstance.patch(`/api/questions/cards/${cardID}`, {
      updatedQuestion,
    })
    return response.data
  } catch (error) {
    const err = error as AxiosError
    console.log('ERROR: ', err.response?.data)
  }
}

export const deleteQuestionAPI = async (questionID: string) => {
  try {
    const response = await apiInstance.delete(`/api/questions/${questionID}`)
    return response.data
  } catch (error) {
    const err = error as AxiosError
    console.log('ERROR: ', err.response?.data)
  }
}
