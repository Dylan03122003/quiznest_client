import { useState } from 'react'
import { IoMdArrowRoundForward } from 'react-icons/io'
import Button from '../../../components/ui/Button'
import { Flashcard } from '../../../types/deck.types'
import { parseHTML } from '../../../util/others'

interface Props {
  flashCard: Flashcard
  questionOrdinal: number
  onNextQuestion: () => void
}

export default function FlashCardRevision({
  flashCard,
  questionOrdinal,
  onNextQuestion,
}: Props) {
  const [showAnswer, setShowAnswer] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  return (
    <div className="flex flex-col sm:flex-row bg-none sm:bg-card-light sm:dark:bg-card-dark sm:shadow-custom  rounded-md">
      <div className="flex-1 p-4 border-b-[1px] sm:border-b-0 sm:border-r-[1px] border-solid border-gray-200 dark:border-gray-700">
        <div className="pl-2 mb-5 flex items-start gap-2 ">
          <p className="text-title-light dark:text-title-dark">
            {questionOrdinal}.
          </p>
          <div className={'tiptap'}>{parseHTML(flashCard.content)}</div>
        </div>

        {showAnswer && (
          <div className="mb-4 p-2 bg-green-50 dark:bg-green-800 rounded-md border border-solid border-green-200 dark:border-green-700">
            <h2 className="text-lg font-semibold text-green-700 dark:text-green-50 mb-4">
              Answer
            </h2>
            <div className={'tiptap'}>{parseHTML(flashCard.back)}</div>
          </div>
        )}

        {showExplanation && (
          <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-md border border-solid border-gray-200 dark:border-gray-600">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
              Explanation
            </h2>
            <div className="tiptap">{parseHTML(flashCard.explanation!)}</div>
          </div>
        )}
      </div>

      <div className="flex flex-col items-start gap-2 p-4">
        <Button
          width="w-full"
          onClick={() => setShowAnswer(true)}
          type="button"
        >
          Show answer
        </Button>

        {showAnswer && flashCard.explanation && (
          <Button
            width="w-full"
            onClick={() => setShowExplanation(true)}
            type="button"
          >
            Show explanation
          </Button>
        )}

        {showAnswer && (
          <button
            className="w-full flex items-center justify-center gap-2 bg-green-100 dark:bg-green-600 text-green-700 dark:text-white font-semibold rounded-md py-1"
            onClick={() => {
              setShowAnswer(false)
              setShowExplanation(false)
              onNextQuestion()
            }}
            type="button"
          >
            <p>Next</p>
            <IoMdArrowRoundForward />
          </button>
        )}
      </div>
    </div>
  )
}
