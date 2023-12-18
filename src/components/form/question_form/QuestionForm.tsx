import { useState } from 'react'
import { QuestionType } from '../../../types/deckTypes'
import SelectField from '../../ui/SelectField'

import { useAddQuestionMutation } from '../../../react_query/questions'
import ClozeCardForm from './ClozeCardForm'
import FlashCardForm from './FlashCardForm'
import MultipleChoiceForm from './MultipleChoiceForm'

export type InputQuestion =
  | InputClozeCard
  | InputFlashCard
  | InputMultipleChoice

export interface InputClozeCard {
  type: QuestionType.CLOZE_CARD
  content: string
  answers: string[]
}

export interface InputFlashCard {
  type: QuestionType.FLASHCARD
  content: string
  back: string
  explanation?: string
}

export interface InputMultipleChoice {
  type: QuestionType.MULTIPLE_CHOICE
  content: string
  choices: string[]
  answers: string[]
}

export type StateAfterCreate = 'success' | 'fail' | 'not_make_request_yet'

interface Props {
  deckID: string
  onClose?: () => void
}

const QuestionForm = ({ deckID, onClose }: Props) => {
  const [selectedType, setSelectedType] = useState<QuestionType>(
    QuestionType.FLASHCARD,
  )
  const [stateAfterCreate, setStateAfterCreate] = useState<StateAfterCreate>(
    'not_make_request_yet',
  )

  const { mutate: createQuestionMutation, isLoading } = useAddQuestionMutation({
    setStateAfterCreate,
    deckID,
  })

  const renderSelectedForm = () => {
    switch (selectedType) {
      case QuestionType.CLOZE_CARD:
        return (
          <ClozeCardForm
            onClose={onClose}
            isLoading={isLoading}
            onSubmit={(clozeCard) => {
              createQuestionMutation({ deckID, inputQuestion: clozeCard })
            }}
          />
        )
      case QuestionType.FLASHCARD:
        return (
          <FlashCardForm
            onClose={onClose ? onClose : () => {}}
            onSetStateAfterCreate={setStateAfterCreate}
            stateAfterCreate={stateAfterCreate}
            isLoading={isLoading}
            onSubmit={(flashCard) => {
              createQuestionMutation({ deckID, inputQuestion: flashCard })
            }}
          />
        )
      case QuestionType.MULTIPLE_CHOICE:
        return (
          <MultipleChoiceForm
            onClose={onClose}
            isLoading={isLoading}
            onSubmit={(multipleChoice) => {
              createQuestionMutation({ deckID, inputQuestion: multipleChoice })
            }}
          />
        )
      default:
        return <div></div>
    }
  }

  return (
    <>
      <SelectField
        label="Select a type"
        width="w-full"
        textLabelColor="text-text-light dark:text-text-dark"
        selectedTagTextColor="text-text-light dark:text-text-dark"
        optionTextColor="text-text-light dark:text-text-dark"
        menuBgColor="bg-white dark:bg-card-dark"
        optionHoverColor="hover:bg-gray-100 dark:hover:bg-gray-700"
        marginBottom="mb-5"
        options={[
          QuestionType.CLOZE_CARD,
          QuestionType.FLASHCARD,
          QuestionType.MULTIPLE_CHOICE,
        ]}
        onChange={(tag) => setSelectedType(tag as QuestionType)}
        value={selectedType}
      />

      {renderSelectedForm()}
    </>
  )
}

export default QuestionForm
