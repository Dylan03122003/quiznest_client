import React, { useState } from 'react'
import {
  useChangeParentDeckMutation,
  useGetAllDecksQuery,
} from '../../react_query/deck'
import { Deck } from '../../types/deckTypes'
import { containsChildDeck } from '../../util/deck'
import DeckItem from './DeckItem'
import DeckListLoading from './DeckListLoading'

export default function DeckList() {
  const [openDeckIDs, setOpenDeckIDs] = useState<string[]>([])
  const [activeDeckIDUserDragOver, setActiveDeckIDUserDragOver] = useState<
    string | null
  >(null)
  const [currentDrageedDeckID, setCurrentDraggedDeckID] = useState<
    string | null
  >(null)
  const [isDraggingOverRoot, setIsDraggingOverRoot] = useState<boolean>(false)

  const { isLoading, data } = useGetAllDecksQuery()
  const decks = data ? data.data : []

  const {
    mutate: changeParentDeckIDMutation,
    isLoading: isChangingParentDeck,
  } = useChangeParentDeckMutation()

  const handleDrag = (e: React.DragEvent, deckID: string) => {
    e.dataTransfer.setData('deckID', deckID)
    setCurrentDraggedDeckID(deckID)
  }

  const handleOnDrop = (e: React.DragEvent, deckIDUserDropOn: string) => {
    setActiveDeckIDUserDragOver(null)

    const deckIDUserDrag = e.dataTransfer.getData('deckID')

    const deckIDIsTheSame = deckIDUserDrag === deckIDUserDropOn
    if (deckIDIsTheSame) return

    const dragParentOnChild = containsChildDeck(
      decks || [],
      deckIDUserDrag,
      deckIDUserDropOn,
    )
    if (dragParentOnChild) {
      console.log(
        'You have dragged parent deck on child deck. Not allowed to do that!',
      )
      return
    }

    changeParentDeckIDMutation({
      parentDeckID: deckIDUserDropOn,
      childDeckID: deckIDUserDrag,
    })
  }

  const handleDropOnRoot = (e: React.DragEvent) => {
    setIsDraggingOverRoot(false)
    const deckIDUserDrag = e.dataTransfer.getData('deckID')
    changeParentDeckIDMutation({
      parentDeckID: null,
      childDeckID: deckIDUserDrag,
    })
  }

  const handleDragOver = (e: React.DragEvent, deckIDUserDropOn: string) => {
    e.preventDefault()
    setActiveDeckIDUserDragOver(deckIDUserDropOn)
    setIsDraggingOverRoot(false)
  }

  const handleDragOverRoot = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDraggingOverRoot(true)
    setActiveDeckIDUserDragOver(null)
  }

  const handleOpenDecks = (openDeckID: string) => {
    const alreadyOpened = openDeckIDs.includes(openDeckID)
    if (alreadyOpened) {
      setOpenDeckIDs(openDeckIDs.filter((id) => id !== openDeckID))
    } else {
      setOpenDeckIDs([...openDeckIDs, openDeckID])
    }
  }

  const renderDecks = (decks: Deck[]) => {
    const isAtTopLevel = decks[0] && decks[0].parentDeckID

    return (
      <div className={`${isAtTopLevel ? 'pl-4' : ''}`}>
        {decks.map((deck) => (
          <div className="" key={deck.deckID}>
            <DeckItem
              activeDeckIDUserDragOver={activeDeckIDUserDragOver}
              currentDrageedDeckID={currentDrageedDeckID}
              deck={deck}
              openDeckIDs={openDeckIDs}
              onDragOverDeck={handleDragOver}
              onDragStartDeck={handleDrag}
              onDropDeck={handleOnDrop}
              onOpenDecks={handleOpenDecks}
            />
            {openDeckIDs.includes(deck.deckID) &&
              deck.childDecks &&
              deck.childDecks.length > 0 &&
              renderDecks(deck.childDecks)}
          </div>
        ))}
      </div>
    )
  }

  if (isLoading) {
    return <DeckListLoading />
  }

  if (isChangingParentDeck) {
    return <div>Changing parent...</div>
  }

  return (
    <div>
      <div className="max-w-[1000px] mx-auto">
        <h2
          onDrop={(e) => handleDropOnRoot(e)}
          onDragOver={(e) => handleDragOverRoot(e)}
          className={`mb-4 p-2 text-title-light dark:text-title-dark font-semibold text-lg border-b-[1px] border-solid ${
            isDraggingOverRoot ? 'border-action' : 'border-transparent'
          }`}
        >
          🔮 Your wonderful decks
        </h2>

        {renderDecks(decks || [])}
      </div>
    </div>
  )
}
