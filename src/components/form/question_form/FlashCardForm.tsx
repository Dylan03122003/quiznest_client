import React, { useEffect, useState } from 'react'
import { QuestionType } from '../../../types/deckTypes'
import Button from '../../ui/Button'
import TextArea from '../../ui/TextArea'
import { InputFlashCard, StateAfterCreate } from './QuestionForm'

interface CreateProps {
  usedFor: 'create'
}

interface UpdateProps {
  usedFor: 'update'
  oldFlashCard: InputFlashCard
}

interface Props {
  isLoading?: boolean
  stateAfterCreate?: StateAfterCreate
  otherProps?: UpdateProps | CreateProps
  onSetStateAfterCreate?: (stateAfterCreate: StateAfterCreate) => void
  onSubmit: (flashCard: InputFlashCard) => void
  onClose?: () => void
}

export default function FlashCardForm({
  onSubmit,
  onClose,
  isLoading,
  otherProps,
  stateAfterCreate,
  onSetStateAfterCreate,
}: Props) {
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

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setFlashCard((prevData) => {
      return { ...prevData, [`${e.target.name}`]: e.target.value }
    })
  }

  const isDisabledBtn = () => {
    const noContent =
      !flashCard.content || flashCard.content.trim().length === 0

    if (noContent) return true

    const noBack = !flashCard.back || flashCard.back.trim().length === 0

    if (noBack) return true

    return false
  }

  const getButtonText = () => {
    if (isLoading)
      return otherProps?.usedFor === 'update' ? 'Updating...' : 'Creating...'
    return otherProps?.usedFor === 'update' ? 'Update' : 'Create'
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(flashCard)
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextArea
        textLabelColor="text-text-light dark:text-text-dark"
        bgInputColor="bg-white dark:bg-card-dark"
        textInputColor="text-text-light dark:text-text-dark"
        label="Front"
        width="w-full"
        name="content"
        mb="mb-4"
        value={flashCard.content}
        onChange={(e) => handleChange(e)}
      />
      <TextArea
        textLabelColor="text-text-light dark:text-text-dark"
        textInputColor="text-text-light dark:text-text-dark"
        bgInputColor="bg-white dark:bg-card-dark"
        label="Back"
        width="w-full"
        mb="mb-4"
        name="back"
        value={flashCard.back}
        onChange={(e) => handleChange(e)}
      />
      <TextArea
        textLabelColor="text-text-light dark:text-text-dark"
        textInputColor="text-text-light dark:text-text-dark"
        bgInputColor="bg-white dark:bg-card-dark"
        label="Explanation"
        width="w-full"
        name="explanation"
        value={flashCard.explanation}
        onChange={(e) => handleChange(e)}
      />

      <div className="flex items-center justify-end gap-4 mt-5 ">
        <Button
          onClick={onClose}
          backgroundColor="bg-gray-100 dark:bg-primary-dark"
          textColor="text-primary-dark dark:text-primary-light"
        >
          Cancel
        </Button>
        <Button
          disabled={isDisabledBtn() || isLoading}
          type="submit"
          disabledBgColor="disabled:opacity-40"
        >
          {getButtonText()}
        </Button>
      </div>
    </form>
  )
}
