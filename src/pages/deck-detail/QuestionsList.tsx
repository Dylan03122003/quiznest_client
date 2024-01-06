import { useState } from 'react'
import { Question } from '../../types/deckTypes'
import QuestionItem from './question-item/QuestionItem'

interface Props {
  questions: Question[]
}
export default function QuestionsList({ questions }: Props) {
  const [currentTab, setCurrentTab] = useState<
    'ALL_QUESTIONS' | 'BOOKMARKED_QUESTIONS'
  >('ALL_QUESTIONS')

  const bookmarkedQuestionsSize = questions.filter((question) => {
    return question.isBookmarked
  }).length

  const getQuestionsByTab = () => {
    if (currentTab === 'ALL_QUESTIONS') return questions

    if (currentTab === 'BOOKMARKED_QUESTIONS') {
      return questions.filter((question) => {
        return question.isBookmarked
      })
    }

    return []
  }

  return (
    <div className="mt-32">
      <div className="flex items-center justify-start gap-4 mb-5">
        <button
          className={`${
            currentTab === 'ALL_QUESTIONS'
              ? 'bg-gray-700 text-gray-200 dark:bg-gray-200 dark:text-gray-700'
              : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
          }  px-2 py-1 rounded-md font-medium`}
          onClick={() => setCurrentTab('ALL_QUESTIONS')}
        >
          All questions ({questions.length})
        </button>
        <button
          className={`${
            currentTab === 'BOOKMARKED_QUESTIONS'
              ? 'bg-gray-700 text-gray-200 dark:bg-gray-200 dark:text-gray-700'
              : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
          }  px-2 py-1 rounded-md font-medium`}
          onClick={() => setCurrentTab('BOOKMARKED_QUESTIONS')}
        >
          Bookmarked questions ({bookmarkedQuestionsSize})
        </button>
      </div>

      {getQuestionsByTab().length === 0 && <div>There is no question</div>}

      {getQuestionsByTab().map((question) => (
        <QuestionItem key={question.questionID} question={question} />
      ))}
    </div>
  )
}
