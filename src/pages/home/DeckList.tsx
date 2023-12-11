import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { QUERY_KEYS, changeParentDeckID, getDecks } from '../../api/deck'
import { useChildDecksQuery } from '../../react_query/deck'
import { Deck } from '../../slices/deck/deckTypes'
import { containsChildDeck } from '../../util/deck'
import DeckItem from './DeckItem'

export default function DeckList() {
  const queryClient = useQueryClient()
  const [openDeckIDs, setOpenDeckIDs] = useState<string[]>([])
  const [activeDeckIDUserDragOver, setActiveDeckIDUserDragOver] = useState<
    string | null
  >(null)
  const [currentDrageedDeckID, setCurrentDraggedDeckID] = useState<
    string | null
  >(null)
  const [isDraggingOverRoot, setIsDraggingOverRoot] = useState<boolean>(false)
  const [currentParentDeckID, setCurrentParentDeckID] = useState<string | null>(
    null,
  )

  const { isLoading, data } = useQuery({
    queryKey: QUERY_KEYS.DECKS,
    queryFn: getDecks,
  })

  const { data: anotherData } = useChildDecksQuery(
    currentParentDeckID,
    'toggle_deck',
  )
  const childDecks = anotherData?.data || []
  console.log(childDecks)
  const decks = data ? data.data : []

  const {
    mutate: changeParentDeckIDMutation,
    isLoading: isChangingParentDeck,
  } = useMutation({
    mutationFn: changeParentDeckID,
    onMutate: async ({
      parentDeckID,
      childDeckID,
    }: {
      parentDeckID: string | null
      childDeckID: string
    }) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.DECKS] })

      const prevData = queryClient.getQueryData<{ data: Deck[] }>(
        QUERY_KEYS.DECKS,
      )
      const prevDecks = prevData ? prevData.data : []
      console.log(prevDecks, parentDeckID, childDeckID)

      return { prevData }
    },
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEYS.DECKS])
    },
  })

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
              onSetCurrentParentDeckID={setCurrentParentDeckID}
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
    return <div>Loading...</div>
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
