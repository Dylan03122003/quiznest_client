import { Question, QuestionType } from '../../../types/deckTypes'
import { getOrdinalNumber, parseHTML } from '../../../util/others'

interface Props {
  question: Question
}
export default function AnswerItem({ question }: Props) {
  const renderContent = () => {
    switch (question.type) {
      case QuestionType.CLOZE_CARD:
        return <div></div>
      case QuestionType.FLASHCARD:
        return (
          <div
            className={`h-full w-full p-5  gap-2 text-base text-title-light dark:text-title-dark`}
          >
            <div className={'tiptap'}>
              {parseHTML(question.flashCard?.back || '')}
            </div>
            {question.flashCard?.explanation && (
              <>
                <span className="font-medium">Explanation: </span>{' '}
                <div className={'tiptap'}>
                  {parseHTML(question.flashCard?.explanation)}
                </div>
              </>
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
            className={` p-5 h-full w-full flex flex-col items-start justify-center gap-3 text-base text-title-light dark:text-title-dark`}
          >
            {answers && answers.map((answer, i) => <div key={i}>{answer}</div>)}
          </div>
        )
      }
      default:
        return <div></div>
    }
  }
  return <div className="w-full sm:w-[50%]">{renderContent()}</div>
}
