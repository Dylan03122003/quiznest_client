import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import QuestionForm from '../../components/form/question_form/QuestionForm'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import { useDeckQuery } from '../../react_query/deck'
import DeckDetailLoading from './DeckDetailLoading'
import QuestionSlider from './QuestionSlider'
import QuestionsList from './QuestionsList'

export default function DeckDetailPage() {
  const navigateTo = useNavigate()
  const { deckID } = useParams()
  const [openAddQuestion, setOpenAddQuestion] = useState(false)

  const { data, isLoading } = useDeckQuery(deckID!)
  const deckDetail = data?.data

  if (isLoading)
    return (
      <div className="min-h-screen md:px-10 px-5 pt-10 pb-32 bg-primary-light dark:bg-primary-dark">
        <DeckDetailLoading />
      </div>
    )

  return (
    <>
      <AnimatePresence initial={false} mode="wait">
        {openAddQuestion && (
          <Modal
            onClose={() => setOpenAddQuestion(false)}
            className="w-[90%] sm:w-[70%] h-fit bg-card-light dark:bg-card-dark"
          >
            <QuestionForm
              deckID={deckID!}
              onClose={() => setOpenAddQuestion(false)}
            />
          </Modal>
        )}
      </AnimatePresence>
      <div className="min-h-screen md:px-10 px-5 pt-10 pb-32 bg-primary-light dark:bg-primary-dark ">
        <div className="w-full md:w-[700px] lg:w-[900px]  mx-auto">
          <div className="flex items-center justify-between ">
            <h2 className="text-xl text-title-light dark:text-title-dark font-semibold">
              {deckDetail?.title}
            </h2>
            <div className="flex items-center justify-center gap-2">
              <Button
                type="button"
                onClick={() =>
                  navigateTo(`/decks/revision/${deckDetail?.deckID}`)
                }
              >
                Revise
              </Button>
              <Button onClick={() => setOpenAddQuestion(true)}>
                Add Question
              </Button>
            </div>
          </div>

          {deckDetail?.questions && deckDetail.questions.length > 0 && (
            <QuestionSlider
              rootClassName="w-full h-[400px] sm:h-[500px] mt-5"
              questions={deckDetail?.questions || []}
            />
          )}

          {deckDetail?.questions && deckDetail.questions.length === 0 && (
            <div>There is no questions. Add new one!</div>
          )}

          {deckDetail?.questions && deckDetail.questions.length > 0 && (
            <h2 className="mt-40 mb-10 text-lg font-semibold text-title-light dark:text-title-dark">
              Questions List ( {deckDetail?.questions.length} )
            </h2>
          )}
          <QuestionsList questions={deckDetail?.questions || []} />
        </div>
      </div>
    </>
  )
}
