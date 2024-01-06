import { useEffect, useState } from 'react'
import { IoExitOutline } from 'react-icons/io5'
import { Deck, Question } from '../../../types/deckTypes'
import { RevisionType } from '../DeckDetailPage'
import QuestionRevision from './QuestionRevision'

interface Props {
  deckDetail: Deck
  onQuit: () => void
  revisionType: RevisionType
}

export default function DeckRevision({
  deckDetail,
  onQuit,
  revisionType = 'revise_all',
}: Props) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [revisedQuestions, setRevisedQuestions] = useState<Question[]>([])
  const [completeRevision, setCompleteRevision] = useState(false)

  useEffect(() => {
    if (revisionType === 'revise_all') {
      return setRevisedQuestions(deckDetail.questions)
    }
    if (revisionType === 'revise_bookmarks') {
      setRevisedQuestions(deckDetail.questions.filter((q) => q.isBookmarked))
    }
  }, [])

  const getCurrentQuestion = () => {
    return revisedQuestions[currentQuestionIndex]
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex === revisedQuestions.length - 1) {
      return setCompleteRevision(true)
    }

    setCurrentQuestionIndex((prevOne) => prevOne + 1)
  }

  return (
    <div className="relative min-h-screen bg-primary-light dark:bg-primary-dark p-2 pt-20">
      <button
        onClick={onQuit}
        className="px-3 py-1 flex items-center justify-center gap-2 absolute top-5 right-5 rounded-md bg-gray-200 text-primary-dark dark:bg-gray-800 dark:text-white"
      >
        <p>Quit</p>
        <IoExitOutline />
      </button>
      {!completeRevision && getCurrentQuestion() && (
        <QuestionRevision
          questionOrdinal={currentQuestionIndex + 1}
          onNextQuestion={handleNextQuestion}
          question={getCurrentQuestion()!}
        />
      )}
      {completeRevision && (
        <div className="flex items-start justify-center">
          <h2 className="text-xl text-title-light dark:text-title-dark">
            Completed Revision
          </h2>
        </div>
      )}
    </div>
  )
}
