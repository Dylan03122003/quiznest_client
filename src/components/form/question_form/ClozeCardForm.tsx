import React, { useState } from 'react'
import { QuestionType } from '../../../slices/deck/deckTypes'
import Button from '../../ui/Button'
import ClozeTextArea from '../ClozeTextArea'
import { InputClozeCard } from './QuestionForm'

interface Props {
  isLoading?: boolean
  onSubmit: (clozeCard: InputClozeCard) => void
  onClose?: () => void
}

export default function ClozeCardForm({
  onSubmit,
  isLoading = false,
  onClose,
}: Props) {
  const [clozeCard, setClozeCard] = useState<InputClozeCard>({
    type: QuestionType.CLOZE_CARD,
    answers: [],
    content: '',
  })

  const isDisabledBtn = () => {
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(clozeCard)
  }

  return (
    <form onSubmit={handleSubmit}>
      <ClozeTextArea
        label="Content"
        textLabelColor="text-text-light dark:text-text-dark"
        textInputColor="text-text-light dark:text-text-dark"
        width="w-full"
        bgInputColor="bg-white dark:bg-card-dark"
        name="content"
        value={clozeCard.content}
        onGetClozeCard={(content, answers) => {
          setClozeCard((prevOne) => ({
            ...prevOne,
            type: QuestionType.CLOZE_CARD,
            content,
            answers,
          }))
        }}
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
          Create
        </Button>
      </div>
    </form>
  )
}
