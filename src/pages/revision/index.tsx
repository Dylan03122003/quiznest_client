import { useState } from 'react'
import { IoExitOutline } from 'react-icons/io5'
import { useNavigate, useParams } from 'react-router-dom'

import { useDeckQuery } from '../../react_query/deck'
import QuestionRevision from './QuestionRevision'

export default function DeckRevisionPage() {
  const navigateTo = useNavigate()
  const { deckID } = useParams()
  const { data, isLoading } = useDeckQuery(deckID!)
  const deckDetail = data?.data
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [completeRevision, setCompleteRevision] = useState(false)

  const getCurrentQuestion = () => {
    return deckDetail?.questions[currentQuestionIndex]
  }

  const handleNextQuestion = () => {
    if (
      deckDetail &&
      currentQuestionIndex === deckDetail.questions.length - 1
    ) {
      return setCompleteRevision(true)
    }

    setCurrentQuestionIndex((prevOne) => prevOne + 1)
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="relative min-h-screen bg-primary-light dark:bg-primary-dark p-2 pt-20">
      <button
        onClick={() => navigateTo(-1)}
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
