import { User } from './user.types'

export interface Deck {
  deckID: string
  parentDeckID?: string | null
  title: string
  userID: string
  createdAt: Date
  updatedAt: Date
  author: User
  totalQuestions: number
  parentDeck?: Deck | null
  childDecks: Deck[]
  questions: Question[]
}

export interface Question {
  questionID: string
  deckID: string
  isBookmarked: boolean
  type: QuestionType
  clozeCard?: ClozeCard | null
  flashCard?: Flashcard | null
  multipleChoices?: MultipleChoice | null
  revisedAt?: Date | null
  createdAt: Date
  updatedAt: Date
  deck: Deck
}

export enum QuestionType {
  CLOZE_CARD = 'CLOZE_CARD',
  FLASHCARD = 'FLASHCARD',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
}

export interface ClozeCard {
  clozeCardID: string
  questionID: string
  content: string
  answers: string[]
  question: Question
}

export interface Flashcard {
  flashcardID: string
  questionID: string
  content: string
  back: string
  explanation?: string
  question: Question
}

export interface MultipleChoice {
  multipleChoiceID: string
  questionID: string
  content: string
  choices: string[]
  answers: string[]
  explanation?: string
  question: Question
}
