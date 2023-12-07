import { Deck } from '../slices/deck/deckTypes'

export const findADeck = (decks: Deck[], deckID: string): Deck | null => {
  const deck = decks.find((d) => d.deckID === deckID)
  if (deck) {
    return deck
  }
  for (const d of decks) {
    const deck = findADeck(d.childDecks, deckID)
    if (deck) return deck
  }

  return null
}

export const containsChildDeck = (
  decks: Deck[],
  parentDeckID: string,
  childDeckID: string,
) => {
  const parentDeck = findADeck(decks, parentDeckID)
  const childDeck = findADeck(parentDeck?.childDecks || [], childDeckID)

  return childDeck != null
}

export const removeDeck = (decks: Deck[], deckID: string) => {
  const deck = decks.find((d) => d.deckID === deckID)
  if (deck) {
    decks = decks.filter((d) => d.deckID !== deckID)

    return deck
  }
  for (const d of decks) {
    const deck = findADeck(d.childDecks, deckID)
    if (deck) return deck
  }

  return null
}
