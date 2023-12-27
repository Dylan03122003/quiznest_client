import { useEffect, useState } from 'react'
import { QuestionType } from '../../../types/deckTypes'
import Tiptap from '../../ui/tiptap/Tiptap'
import { InputFlashCard, StateAfterCreate } from './QuestionForm'

interface CreateProps {
  usedFor: 'create'
}

interface UpdateProps {
  usedFor: 'update'
  oldFlashCard: InputFlashCard
}

interface Props {
  stateAfterCreate?: StateAfterCreate
  otherProps?: UpdateProps | CreateProps
  onSetStateAfterCreate?: (stateAfterCreate: StateAfterCreate) => void
  onSubmit: (flashCard: InputFlashCard) => void
  onClose?: () => void
}

export default function FlashCardFormEPM({
  onSubmit,
  onClose,
  otherProps = { usedFor: 'create' },
  stateAfterCreate,
  onSetStateAfterCreate,
}: Props) {
  const [process, setProcess] = useState<
    'at_front' | 'at_back' | 'at_explanation'
  >('at_front')

  const [flashCard, setFlashCard] = useState<InputFlashCard>(
    otherProps && otherProps.usedFor === 'update'
      ? otherProps.oldFlashCard
      : {
          type: QuestionType.FLASHCARD,
          back: '',
          content: '',
          explanation: '',
        },
  )

  useEffect(() => {
    if (stateAfterCreate === 'success') {
      setFlashCard({
        type: QuestionType.FLASHCARD,
        back: '',
        content: '',
      })
      onSetStateAfterCreate && onSetStateAfterCreate('not_make_request_yet')
    }
  }, [stateAfterCreate, onSetStateAfterCreate])

  const handleSubmitFrontCard = (frontHTML: string) => {
    setFlashCard((prevOne) => ({ ...prevOne, content: frontHTML }))
    setProcess('at_back')
  }

  const handleSubmitBackCard = (backHTML: string) => {
    setFlashCard((prevOne) => ({ ...prevOne, back: backHTML }))
    setProcess('at_explanation')
  }

  const handleSubmitExplanation = (explanationHTML: string) => {
    setFlashCard((prevOne) => ({ ...prevOne, explanation: explanationHTML }))
    onSubmit({ ...flashCard, explanation: explanationHTML })
    onClose && onClose()
  }

  return (
    <>
      {process === 'at_front' && (
        <Tiptap
          onSubmit={handleSubmitFrontCard}
          content={
            otherProps.usedFor === 'update'
              ? otherProps.oldFlashCard.content
              : ''
          }
          editorHeight="h-[300px] sm:h-[500px]"
          label="Enter front content"
          onCancel={onClose}
          submitText="Continue"
        />
      )}

      {process === 'at_back' && (
        <Tiptap
          onSubmit={handleSubmitBackCard}
          content={
            otherProps.usedFor === 'update' ? otherProps.oldFlashCard.back : ''
          }
          editorHeight="h-full sm:h-[500px]"
          label="Enter back content"
          onCancel={onClose}
          submitText="Continue"
        />
      )}

      {process === 'at_explanation' && (
        <Tiptap
          onSubmit={handleSubmitExplanation}
          content={
            otherProps.usedFor === 'update'
              ? otherProps.oldFlashCard.explanation
              : ''
          }
          isOptional
          editorHeight="h-full sm:h-[500px]"
          label="Enter explanation (optional)"
          onCancel={onClose}
          submitText="Submit"
        />
      )}
    </>
  )
}
