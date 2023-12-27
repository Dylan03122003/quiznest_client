import { Question, QuestionType } from '../../../types/deckTypes'
import { getOrdinalNumber, parseHTML } from '../../../util/others'

interface Props {
  question: Question
}

export default function ContentItem({ question }: Props) {
  const renderContent = () => {
    switch (question.type) {
      case QuestionType.CLOZE_CARD:
        return <div></div>
      case QuestionType.FLASHCARD:
        return (
          <div
            className={`tiptap h-full w-full p-5 text-base text-title-light dark:text-title-dark `}
          >
            {parseHTML(question.flashCard?.content || '')}
          </div>
        )
      case QuestionType.MULTIPLE_CHOICE: {
        const multipleChoice = question.multipleChoices
        return (
          <div
            className={`h-full w-full p-5 flex flex-col items-start justify-center text-base `}
          >
            <h2 className="mb-3 text-title-light dark:text-title-dark font-semibold">
              {multipleChoice?.content}
            </h2>
            <div>
              {multipleChoice?.choices.map((choice, i) => (
                <div
                  className="mb-1 text-title-light dark:text-title-dark"
                  key={i}
                >
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

  return (
    <div className="w-full sm:w-[50%] mt-3 sm:mt-0 border-b-[1px] sm:border-b-[0] sm:border-r-[1px] border-solid border-gray-200 dark:border-gray-600">
      {renderContent()}
    </div>
  )
}
