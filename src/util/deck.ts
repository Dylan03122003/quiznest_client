import { Deck } from '../types/deck.types'

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

export const findAndUpdateTitle = (
  deckList: Deck[],
  deckID: string,
  updatedTitle: string,
): Deck[] => {
  for (let i = 0; i < deckList.length; i++) {
    const currentDeck = deckList[i]

    if (currentDeck.deckID === deckID) {
      // Update the title if the deck is found
      return [
        ...deckList.slice(0, i),
        { ...currentDeck, title: updatedTitle },
        ...deckList.slice(i + 1),
      ]
    }

    if (currentDeck.childDecks && currentDeck.childDecks.length > 0) {
      // Recursively search through child decks
      const updatedChildDecks = findAndUpdateTitle(
        currentDeck.childDecks,
        deckID,
        updatedTitle,
      )

      if (updatedChildDecks !== currentDeck.childDecks) {
        // If child decks were updated, return a new deck with the updated child decks
        return [
          ...deckList.slice(0, i),
          { ...currentDeck, childDecks: updatedChildDecks },
          ...deckList.slice(i + 1),
        ]
      }
    }
  }

  // If the deckID is not found, return the original deckList
  return deckList
}

export const findAndRemoveDeck = (deckList: Deck[], deckID: string): Deck[] => {
  for (let i = 0; i < deckList.length; i++) {
    const currentDeck = deckList[i]

    if (currentDeck.deckID === deckID) {
      // Remove the deck if found
      return [...deckList.slice(0, i), ...deckList.slice(i + 1)]
    }

    if (currentDeck.childDecks && currentDeck.childDecks.length > 0) {
      // Recursively search through child decks
      const updatedChildDecks = findAndRemoveDeck(
        currentDeck.childDecks,
        deckID,
      )

      if (updatedChildDecks !== currentDeck.childDecks) {
        // If child decks were updated, return a new deck with the updated child decks
        return [
          ...deckList.slice(0, i),
          { ...currentDeck, childDecks: updatedChildDecks },
          ...deckList.slice(i + 1),
        ]
      }
    }
  }

  // If the deckID is not found, return the original deckList
  return deckList
}
