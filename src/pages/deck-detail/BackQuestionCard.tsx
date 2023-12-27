import { Question, QuestionType } from '../../types/deckTypes'
import { getOrdinalNumber, parseHTML } from '../../util/others'
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
            className={`overflow-y-auto h-full w-full p-5 ${textSize} text-title-light dark:text-title-dark`}
          >
            <div className="tiptap h-full">
              {parseHTML(question.flashCard?.back || '')}

              {question.flashCard?.explanation && (
                <>
                  <span className="font-medium">Explanation: </span>{' '}
                  <div>{parseHTML(question.flashCard?.explanation)}</div>
                </>
              )}
            </div>
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
            className={` p-5 h-full w-full flex flex-col items-center justify-center gap-3 ${textSize} text-title-light dark:text-title-dark`}
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
