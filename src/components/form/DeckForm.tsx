import { useState } from 'react'
import Modal from '../ui/Modal'
import DeckTitleAndPathForm from './DeckTitleAndPathForm'
import QuestionForm from './question_form/QuestionForm'

interface DeckFormProps {
  onClose: () => void
  openCreateDeck: boolean
}

export type FormProcess = 'CREATE_TITLE_AND_PATH' | 'CREATE_QUESTION'

const DeckForm = ({ onClose, openCreateDeck }: DeckFormProps) => {
  const [process, setProcess] = useState<FormProcess>('CREATE_TITLE_AND_PATH')
  const [createdDeckID, setCreatedDeckID] = useState<string>('')

  return (
    <div>
      {openCreateDeck && (
        <Modal
          className={`w-[90%] sm:w-[600px] ${
            process === 'CREATE_QUESTION'
              ? 'min-h-[600px] max-h-[800px]'
              : 'h-[500px]'
          }  bg-card-light dark:bg-card-dark`}
          onClose={onClose}
        >
          {process === 'CREATE_TITLE_AND_PATH' && (
            <DeckTitleAndPathForm
              onClose={onClose}
              onSetProcess={setProcess}
              onGetCreatedDeckID={setCreatedDeckID}
            />
          )}
          {process === 'CREATE_QUESTION' && (
            <QuestionForm deckID={createdDeckID} />
          )}
        </Modal>
      )}
    </div>
  )
}

export default DeckForm
