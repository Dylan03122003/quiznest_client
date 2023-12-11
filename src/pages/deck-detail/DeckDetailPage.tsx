import { useState } from 'react'
import { useParams } from 'react-router-dom'
import QuestionForm from '../../components/form/question_form/QuestionForm'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import { useDeckQuery } from '../../react_query/deck'

export default function DeckDetailPage() {
  const { deckID } = useParams()
  const [openAddQuestion, setOpenAddQuestion] = useState(false)
  const { data, isLoading } = useDeckQuery(deckID!)
  const deckDetail = data?.data

  if (isLoading) return <div>Loading...</div>

  return (
    <>
      {openAddQuestion && (
        <Modal
          onClose={() => setOpenAddQuestion(false)}
          className="w-[90%] sm:w-[600px] min:h-[600px] bg-card-light dark:bg-card-dark"
        >
          <QuestionForm
            deckID={deckID!}
            onClose={() => setOpenAddQuestion(false)}
          />
        </Modal>
      )}
      <div className="min-h-screen pt-10 bg-primary-light dark:bg-primary-dark">
        <div className="w-[1000px] mx-auto">
          <div className="flex items-center justify-between">
            <h2 className="text-xl text-title-light dark:text-title-dark font-semibold">
              {deckDetail?.title}
            </h2>
            <Button onClick={() => setOpenAddQuestion(true)}>
              Add Question
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
