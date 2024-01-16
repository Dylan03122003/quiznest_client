import { AnimatePresence, motion } from 'framer-motion'
import React, { useRef, useState } from 'react'
import { GoKebabHorizontal } from 'react-icons/go'
import { IoIosArrowForward, IoMdClose } from 'react-icons/io'
import { LiaPenSolid } from 'react-icons/lia'
import { MdDeleteOutline } from 'react-icons/md'
import { Link } from 'react-router-dom'
import ConfirmModal from '../../components/ui/ConfirmModal'
import Overlay from '../../components/ui/Overlay'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import { useWindowSize } from '../../hooks/useWindowSize'
import { useTokenQuery } from '../../react_query/auth'
import {
  useDeleteDeckMutation,
  useUpdateDeckTitleMutation,
} from '../../react_query/deck'
import { Deck } from '../../types/deckTypes'

interface DeckItemProps {
  deck: Deck
  onDropDeck: (e: React.DragEvent, deckID: string) => void
  onDragOverDeck: (e: React.DragEvent, deckID: string) => void
  onDragStartDeck: (e: React.DragEvent, deckID: string) => void
  onOpenDecks: (deckID: string) => void
  activeDeckIDUserDragOver: string | null
  currentDrageedDeckID: string | null
  openDeckIDs: string[]
}

export default function DeckItem({
  deck,
  onDropDeck,
  onDragOverDeck,
  onDragStartDeck,
  activeDeckIDUserDragOver,
  currentDrageedDeckID,
  onOpenDecks,
  openDeckIDs,
}: DeckItemProps) {
  const windowSize = useWindowSize()
  const [toggleDeck, setToggleDeckID] = useState<{
    deckID: string
    open: boolean
  }>()
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false)
  const [updatedDeck, setUpdatedDeck] = useState<{
    deckID: string
    updatedTitle: string
  } | null>(null)
  const updatedFormRef = useRef<HTMLFormElement>(null)
  const { data: token } = useTokenQuery()

  useOutsideClick(updatedFormRef, () => {
    setUpdatedDeck(null)
  })

  const { mutate: deleteDeckMutation } = useDeleteDeckMutation(() =>
    setOpenConfirmModal(false),
  )

  const { mutate: updateDeckTitleMutation } =
    useUpdateDeckTitleMutation(setUpdatedDeck)

  const closeDeckMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    setToggleDeckID({ deckID: '', open: false })
  }

  const handleToggleDeckMenu = (e: React.MouseEvent, deckID: string) => {
    e.preventDefault()
    setToggleDeckID({ deckID, open: !toggleDeck?.open })
  }

  const handleDeleteDeck = (deckID: string) => {
    deleteDeckMutation({ deckID, token: token || '' })
  }

  const handleRenameDeck = (e: React.FormEvent) => {
    e.preventDefault()

    if (updatedDeck && updatedDeck.updatedTitle.trim().length === 0) {
      setUpdatedDeck(null)
      return
    }

    if (updatedDeck) {
      updateDeckTitleMutation({
        deckID: updatedDeck.deckID,
        title: updatedDeck.updatedTitle,
        token: token || '',
      })
    }
  }

  const renderDeckMenu = () => {
    return (
      <>
        {/* Menu for devices greater than mobile phone */}
        <div className="hidden sm:block">
          <Overlay onClose={(e) => closeDeckMenu(e)} />
          <motion.div
            initial={{ x: windowSize === 'is2Xl' ? 0 : -100, opacity: 0 }}
            animate={{ x: windowSize === 'is2Xl' ? 50 : -180, opacity: 1 }}
            exit={{ x: 0, opacity: 0 }}
            onClick={(e) => e.preventDefault()}
            className={`z-20 p-2 flex flex-col gap-4 absolute top-0 left-0 sm:left-5 w-[150px]  bg-card-light dark:bg-card-dark shadow-custom rounded-md`}
          >
            <button
              type="button"
              onClick={(e) => {
                setUpdatedDeck({
                  deckID: deck.deckID,
                  updatedTitle: deck.title,
                })
                closeDeckMenu(e)
              }}
              className="flex items-center justify-start gap-2 hover:bg-slate-100 dark:hover:bg-slate-700 py-2 px-2 rounded-md transition-colors"
            >
              <LiaPenSolid className="w-6 h-6 text-text-light dark:text-white" />
              <p className="text-lg text-text-light dark:text-white font-semibold">
                Rename
              </p>
            </button>
            <button
              className="flex items-center justify-start gap-2 hover:bg-slate-100 dark:hover:bg-slate-700 py-2 px-2 rounded-md transition-colors"
              type="button"
              onClick={(e) => {
                setOpenConfirmModal(true)
                closeDeckMenu(e)
              }}
            >
              <MdDeleteOutline className="w-6 h-6 text-red-400" />
              <p className="text-lg text-red-400 font-semibold">Delete</p>
            </button>
          </motion.div>
        </div>

        {/* Menu for mobile phone */}
        <div className="block sm:hidden">
          <Overlay
            className="bg-[#00000079]"
            onClose={(e) => closeDeckMenu(e)}
          />
          <motion.div
            onClick={(e) => e.preventDefault()}
            className={`z-20 fixed top-[70%]  left-0 right-0 bottom-0 bg-primary-light dark:bg-primary-dark cursor-auto`}
          >
            <div className="flex items-center justify-between p-4">
              <h2 className="text-title-light dark:text-title-dark text-lg font-semibold">
                {deck.title}
              </h2>
              <button
                onClick={(e) => closeDeckMenu(e)}
                className="rounded-full bg-gray-200 dark:bg-gray-700"
              >
                <IoMdClose className="w-6 h-6 text-text-light dark:text-text-dark" />
              </button>
            </div>
            <div>
              <button
                type="button"
                onClick={(e) => {
                  setUpdatedDeck({
                    deckID: deck.deckID,
                    updatedTitle: deck.title,
                  })
                  closeDeckMenu(e)
                }}
                className="flex items-center justify-start gap-2 hover:bg-slate-100 dark:hover:bg-slate-700 py-2 px-2 rounded-md transition-colors"
              >
                <LiaPenSolid className="w-5 h-5 text-text-light dark:text-white" />
                <p className=" text-text-light dark:text-white font-semibold">
                  Rename
                </p>
              </button>
              <button
                className="flex items-center justify-start gap-2 hover:bg-slate-100 dark:hover:bg-slate-700 py-2 px-2 rounded-md transition-colors"
                type="button"
                onClick={(e) => {
                  setOpenConfirmModal(true)
                  closeDeckMenu(e)
                }}
              >
                <MdDeleteOutline className="w-5 h-5 text-red-400" />
                <p className=" text-red-400 font-semibold">Delete</p>
              </button>
            </div>
          </motion.div>
        </div>
      </>
    )
  }

  const renderDeckTitle = () => {
    if (updatedDeck && updatedDeck.deckID === deck.deckID) {
      return (
        <form ref={updatedFormRef} className="" onSubmit={handleRenameDeck}>
          <input
            className=" px-2 py-[2px] text-text-light dark:text-text-dark bg-primary-light dark:bg-primary-dark outline-1 outline-primary-dark dark:outline-primary-light"
            autoFocus
            onClick={(e) => e.preventDefault()}
            type="text"
            value={updatedDeck.updatedTitle}
            onChange={(e) =>
              setUpdatedDeck((prevOne) => {
                if (prevOne) return { ...prevOne, updatedTitle: e.target.value }
                return prevOne
              })
            }
          />
        </form>
      )
    }

    return (
      <p className="text-text-light dark:text-text-dark font-semibold px-2 py-[2px]">
        {deck.title}
      </p>
    )
  }

  return (
    <>
      <AnimatePresence initial={false} mode="wait">
        {openConfirmModal && (
          <ConfirmModal
            deletedID={deck.deckID}
            onClose={() => setOpenConfirmModal(false)}
            onDelete={handleDeleteDeck}
            title="Delete Deck?"
            description="Every child decks and questions will be deleted."
          />
        )}
      </AnimatePresence>

      <Link
        to={`decks/${deck.deckID}`}
        onDrop={(e) => onDropDeck(e, deck.deckID)}
        onDragOver={(e) => onDragOverDeck(e, deck.deckID)}
        draggable
        onDragStart={(e) => onDragStartDeck(e, deck.deckID)}
        className={`group flex items-center justify-start gap-2 p-2 pr-7 border border-solid  mb-4 rounded-sm cursor-pointer  ${
          activeDeckIDUserDragOver === deck.deckID &&
          activeDeckIDUserDragOver !== currentDrageedDeckID
            ? 'border-action'
            : 'border-gray-400'
        }`}
      >
        <button
          onClick={(e) => {
            e.preventDefault()
            onOpenDecks(deck.deckID)
          }}
          type="button"
        >
          <IoIosArrowForward
            className={`p-1 w-6 h-6 rounded-md text-primary-dark dark:text-primary-light hover:bg-gray-200 hover:dark:bg-card-dark transition-all duration-200
                    ${
                      openDeckIDs.includes(deck.deckID)
                        ? 'rotate-90 '
                        : '-rotate-0 '
                    }`}
          />
        </button>
        <div>
          {renderDeckTitle()}
          {/* <p className="mt-1 px-2 text-text-light dark:text-text-dark text-sm">
            <span className="">{deck.totalQuestions}</span>{' '}
            <span className="">questions</span>
          </p> */}
        </div>

        <div className="relative ml-auto">
          <button
            type="button"
            onClick={(e) => handleToggleDeckMenu(e, deck.deckID)}
            className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 p-[6px] rounded-md hover:bg-gray-200 hover:dark:bg-card-dark transition-all duration-200"
          >
            <GoKebabHorizontal className="w-5 h-5 text-primary-dark dark:text-primary-light" />
          </button>

          {toggleDeck?.deckID === deck.deckID &&
            toggleDeck.open &&
            renderDeckMenu()}
        </div>
      </Link>
    </>
  )
}
