import { Question, QuestionType } from '../../types/deckTypes'
import { getOrdinalNumber } from '../../util/others'
interface Props {
  question: Question
  rootClassName?: string
  textSize?: string
}
export default function BackQuestionCard({
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
            className={`h-full w-full p-5  flex flex-col items-center justify-center gap-2 ${textSize} text-title-light dark:text-title-dark`}
          >
            <p>{question.flashCard?.back}</p>
            {question.flashCard?.explanation && (
              <p>
                <span className="font-medium">Explanation: </span>{' '}
                {question.flashCard?.explanation}
              </p>
            )}
          </div>
        )
      case QuestionType.MULTIPLE_CHOICE: {
        const multipleChoice = question.multipleChoices
        const answers = multipleChoice?.answers.map((answer) => {
          const answerOrdinal =
            multipleChoice?.choices.findIndex((c) => c === answer) + 1

          return getOrdinalNumber(answerOrdinal) + '. ' + answer
        })
        return (
          <div
            className={` p-5 h-full w-full flex flex-col items-start justify-center gap-3 ${textSize} text-title-light dark:text-title-dark`}
          >
            {answers && answers.map((answer, i) => <div key={i}>{answer}</div>)}
          </div>
        )
      }
      default:
        return <div></div>
    }
  }
  return <div className={rootClassName}>{renderContent()}</div>
}
