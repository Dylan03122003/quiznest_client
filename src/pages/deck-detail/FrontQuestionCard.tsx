import { Question, QuestionType } from '../../types/deckTypes'
import { getOrdinalNumber } from '../../util/others'

interface Props {
  question: Question
  textSize?: string
  rootClassName?: string
}

export default function FrontQuestionCard({
  question,
  rootClassName = 'rounded-md w-full h-full bg-card-light dark:bg-card-dark ',
  textSize = 'text-2xl',
}: Props) {
  const renderContent = () => {
    switch (question.type) {
      case QuestionType.CLOZE_CARD:
        return <div></div>
      case QuestionType.FLASHCARD:
        return (
          <div
            className={`h-full w-full p-5 flex items-center justify-center ${textSize} text-title-light dark:text-title-dark `}
          >
            {question.flashCard?.content}
          </div>
        )
      case QuestionType.MULTIPLE_CHOICE: {
        const multipleChoice = question.multipleChoices
        return (
          <div
            className={`h-full w-full p-5 flex flex-col items-start justify-center ${textSize} text-title-light dark:text-title-dark`}
          >
            <h2 className="mb-3 font-semibold">{multipleChoice?.content}</h2>
            <div>
              {multipleChoice?.choices.map((choice, i) => (
                <div className="mb-1" key={i}>
                  {getOrdinalNumber(i + 1)}. {choice}
                </div>
              ))}
            </div>
          </div>
        )
      }
      default:
        return <div></div>
    }
  }

  return <div className={rootClassName}>{renderContent()}</div>
}
