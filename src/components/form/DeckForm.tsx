import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useMutation } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { addCardToExistingDeck, createDeck } from '../../api/deck'
import { addDesk } from '../../slices/deck/deckSlice'
import { NewCard, NewDeck } from '../../slices/deck/deckTypes'
import { RootState } from '../../store'
import Modal from '../ui/Modal'
import CardForm from './CardForm'
import DeckTitleForm from './DeckTitleForm'

enum Process {
  CREATE_TITLE,
  CREATE_CARD,
}

interface DeckFormProps {
  open: boolean
  onClose: () => void
}

const DeckForm = ({ open = false, onClose }: DeckFormProps) => {
  const { currentUser } = useSelector((state: RootState) => state.authState)
  const dispatch = useDispatch()
  const [currentProcess, setCurrentProcess] = useState<Process>(
    Process.CREATE_TITLE,
  )
  const [newDeck, setNewDeck] = useState<NewDeck>({
    cards: [],
    title: '',
    userID: currentUser!._id,
  })
  const [deckIDFromDB, setDeckIDFromDB] = useState<string>('')

  const createDeckMutation = useMutation(createDeck, {
    onSuccess(data) {
      dispatch(addDesk(data.deck))
      setDeckIDFromDB(data.deck._id)
    },
  })

  const addCardMutation = useMutation(addCardToExistingDeck, {
    onSuccess() {
      //
    },
  })

  function handleSubmitTitle(title: string) {
    setNewDeck((prevDeck) => ({ ...prevDeck, title }))
    setCurrentProcess(Process.CREATE_CARD)
  }

  function handleCardBack() {
    setCurrentProcess(Process.CREATE_TITLE)
  }

  function handleSubmitCard(card: NewCard) {
    setNewDeck((prevDeck) => {
      const newDeck = {
        ...prevDeck,
        cards: [...prevDeck.cards, card],
      }
      if (!deckIDFromDB) createDeckMutation.mutate(newDeck)
      else addCardMutation.mutate({ card, deckID: deckIDFromDB })
      return newDeck
    })
  }

  return (
    <AnimatePresence initial={false} mode="wait">
      {open && (
        <Modal
          onClose={onClose}
          className={`w-[600px] ${
            currentProcess === Process.CREATE_CARD ? 'h-fit' : 'h-[400px]'
          } `}
        >
          {currentProcess === Process.CREATE_TITLE && (
            <DeckTitleForm
              availableTitle={newDeck.title}
              onSubmitTitle={(title) => handleSubmitTitle(title)}
            />
          )}

          {currentProcess === Process.CREATE_CARD && (
            <CardForm
              onCancel={onClose}
              onBack={handleCardBack}
              onSubmitCard={handleSubmitCard}
            />
          )}
        </Modal>
      )}
    </AnimatePresence>
  )
}

export default DeckForm
