import { Deck } from '../types/deckTypes'

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

export function appendDeck(
  decks: Deck[],
  newChildDecks: Deck[],
  deckID: string,
): Deck[] {
  const findAndAppend = (currentDeck: Deck): Deck => {
    if (currentDeck.deckID === deckID) {
      // If the deckID matches, append newChildDecks to the childDecks array
      return {
        ...currentDeck,
        childDecks: [...newChildDecks],
      }
    }

    // Recursively search through childDecks
    const updatedChildDecks = currentDeck.childDecks
      ? currentDeck.childDecks.map(findAndAppend)
      : []

    // Return the current deck with updated childDecks
    return {
      ...currentDeck,
      childDecks: updatedChildDecks,
    }
  }

  // Use map to apply the findAndAppend function to each top-level deck
  const updatedDecks = decks.map(findAndAppend)

  return updatedDecks
}
