export enum CardType {
  FlashCard = 'flash card',
  ReversedCard = 'reversed card',
}

export interface FlashCard {
  _id: string
  type: CardType.FlashCard
  question: string
  answer: string
  deckID: string
}

export interface ReversedCard {
  _id: string
  type: CardType.ReversedCard
  front: string
  back: string
  deckID: string
}

export type Card = FlashCard | ReversedCard

export interface Deck {
  _id: string
  title: string
  userID: string
  // cards: (FlashCard | ReversedCard)[]
}

// New Stuff

export type NewCard = NewFlashCard | NewReversedCard

export type NewDeck = Omit<Deck, '_id' | 'cards'> & {
  cards: (NewFlashCard | NewReversedCard)[]
}

export type NewFlashCard = Omit<FlashCard, '_id'>

export type NewReversedCard = Omit<ReversedCard, '_id'>

// State

export interface DeckState {
  decks: Deck[]
}
