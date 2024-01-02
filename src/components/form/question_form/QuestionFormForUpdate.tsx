import { useUpdateCardMutation } from '../../../react_query/questions'
import { Question, QuestionType } from '../../../types/deckTypes'
import ClozeCardForm from './ClozeCardForm'
import FlashCardForm from './FlashCardForm'
import MultipleChoiceForm from './MultipleChoiceForm'
import {
  InputFlashCard,
  InputMultipleChoice,
  InputQuestion,
} from './QuestionForm'

interface Props {
  oldQuestion: Question
  currentViewdDeckID: string
  onClose?: () => void
}

export default function QuestionFormForUpdate({
  oldQuestion,
  onClose,
  currentViewdDeckID,
}: Props) {
  const { mutate: updateCardMutation } = useUpdateCardMutation(
    oldQuestion,
    currentViewdDeckID,
    onClose,
  )

  const handleUpdateFlashCard = (
    updatedFlashCard: InputFlashCard,
    oldQuestion: Question,
  ) => {
    const updatedQuestion = {
      ...oldQuestion,
    }

    updatedQuestion.flashCard = {
      ...updatedQuestion.flashCard!,
      content: updatedFlashCard.content,
      back: updatedFlashCard.back,
      explanation: updatedFlashCard.explanation?.trim(),
    }
    const cardID = updatedQuestion.flashCard.flashcardID

    if (cardID) {
      updateCardMutation({ cardID, updatedQuestion })
    }
  }

  const handleUpdateMultipleChoice = (
    updatedMultipleChoice: InputMultipleChoice,
    oldQuestion: Question,
  ) => {
    const updatedQuestion = {
      ...oldQuestion,
    }

    updatedQuestion.multipleChoices = {
      ...updatedQuestion.multipleChoices!,
      choices: updatedMultipleChoice.choices,
      content: updatedMultipleChoice.content,
      answers: updatedMultipleChoice.answers,
    }

    const cardID = updatedQuestion.multipleChoices.multipleChoiceID
    if (cardID) {
      updateCardMutation({ cardID, updatedQuestion })
    }
  }

  const handleSubmit = (updatedCard: InputQuestion) => {
    switch (updatedCard.type) {
      case QuestionType.CLOZE_CARD:
        break
      case QuestionType.FLASHCARD:
        handleUpdateFlashCard(updatedCard, oldQuestion)
        break
      case QuestionType.MULTIPLE_CHOICE:
        handleUpdateMultipleChoice(updatedCard, oldQuestion)
        break
      default:
        break
    }
  }

  const renderForm = () => {
    const type = oldQuestion.type
    switch (type) {
      case QuestionType.CLOZE_CARD:
        return (
          <ClozeCardForm
            onClose={onClose}
            isLoading={false}
            onSubmit={() => {}}
          />
        )
      case QuestionType.FLASHCARD: {
        const oldFlashCard: InputFlashCard = {
          back: oldQuestion.flashCard?.back || '',
          content: oldQuestion.flashCard?.content || '',
          explanation: oldQuestion.flashCard?.explanation || '',
          type: QuestionType.FLASHCARD,
        }

        return (
          <FlashCardForm
            onClose={onClose ? onClose : () => {}}
            otherProps={{ oldFlashCard, usedFor: 'update' }}
            onSubmit={(updatedFlashCard) => {
              handleSubmit(updatedFlashCard)
            }}
          />
        )
      }
      case QuestionType.MULTIPLE_CHOICE: {
        const oldMultipleChoice: InputMultipleChoice = {
          answers: oldQuestion.multipleChoices?.answers || [],
          choices: oldQuestion.multipleChoices?.choices || [],
          content: oldQuestion.multipleChoices?.content || '',
          type: QuestionType.MULTIPLE_CHOICE,
        }

        return (
          <MultipleChoiceForm
            onClose={onClose}
            isLoading={false}
            otherProps={{ usedFor: 'update', oldMultipleChoice }}
            onSubmit={(updatedMultipleChoice) =>
              handleSubmit(updatedMultipleChoice)
            }
          />
        )
      }
      default:
        return <div></div>
    }
  }

  return (
    <div className="p-4 w-full bg-card-light dark:bg-card-dark">
      {renderForm()}
    </div>
  )
}
