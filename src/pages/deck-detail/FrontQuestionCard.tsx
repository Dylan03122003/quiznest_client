import { Question, QuestionType } from '../../types/deck.types'
import { getOrdinalNumber, parseHTML } from '../../util/others'

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
            className={`overflow-y-auto h-full w-full p-5 ${textSize} text-title-light dark:text-title-dark `}
          >
            <div className="tiptap h-full">
              {parseHTML(question.flashCard?.content || '')}
            </div>
          </div>
        )
      case QuestionType.MULTIPLE_CHOICE: {
        const multipleChoice = question.multipleChoices
        return (
          <div className={`overflow-y-auto h-full w-full p-5  ${textSize} `}>
            <div className="h-full flex flex-col items-start justify-center">
              <h2 className="mb-3 text-title-light dark:text-title-dark font-semibold">
                {multipleChoice?.content}
              </h2>
              <div className="">
                {multipleChoice?.choices.map((choice, i) => (
                  <div
                    className="text-title-light dark:text-title-dark mb-1"
                    key={i}
                  >
                    {getOrdinalNumber(i + 1)}. {choice}
                  </div>
                ))}
              </div>
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
