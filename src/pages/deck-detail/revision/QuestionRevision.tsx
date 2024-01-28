import { Question, QuestionType } from '../../../types/deck.types'
import FlashCardRevision from './FlashCardRevision'
import MultipleChoiceRevision from './MultipleChoiceRevision'

interface Props {
  questionOrdinal: number
  question: Question
  onNextQuestion: () => void
}

export default function QuestionRevision({
  question,
  onNextQuestion,
  questionOrdinal,
}: Props) {
  const renderAppropriateQuestion = () => {
    switch (question.type) {
      case QuestionType.CLOZE_CARD:
        return <div></div>
      case QuestionType.FLASHCARD:
        return (
          <FlashCardRevision
            questionOrdinal={questionOrdinal}
            onNextQuestion={onNextQuestion}
            flashCard={question.flashCard!}
          />
        )
      case QuestionType.MULTIPLE_CHOICE:
        return (
          <MultipleChoiceRevision
            questionOrdinal={questionOrdinal}
            onNextQuestion={onNextQuestion}
            multipleChoice={question.multipleChoices!}
          />
        )

      default:
        return <div></div>
    }
  }

  return (
    <div className="w-full md:w-[700px] lg:w-[900px] mx-auto">
      {renderAppropriateQuestion()}
    </div>
  )
}
