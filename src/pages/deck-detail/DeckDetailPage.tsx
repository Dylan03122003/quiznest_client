import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import QuestionForm from '../../components/form/question_form/QuestionForm'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import { useDeckQuery } from '../../react_query/deck'
import DeckDetailLoading from './DeckDetailLoading'
import QuestionSlider from './QuestionSlider'
import QuestionsList from './QuestionsList'
import DeckRevision from './revision'

export type RevisionType = 'revise_all' | 'revise_bookmarks'

export default function DeckDetailPage() {
  const { deckID } = useParams()
  const [openAddQuestion, setOpenAddQuestion] = useState(false)
  const [openReviseMenu, setOpenReviseMenu] = useState(false)
  const [revisionType, setRevisionType] = useState<RevisionType | null>(null)

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

      {revisionType && (
        <DeckRevision
          deckDetail={deckDetail!}
          onQuit={() => setRevisionType(null)}
          revisionType={revisionType}
        />
      )}

      {!revisionType && (
        <div className="min-h-screen md:px-10 px-5 pt-10 pb-32 bg-primary-light dark:bg-primary-dark ">
          <div className="w-full md:w-[700px] lg:w-[900px]  mx-auto">
            <div className="flex items-center justify-between ">
              <h2 className="text-xl text-title-light dark:text-title-dark font-semibold">
                {deckDetail?.title}
              </h2>
              <div className="flex items-center justify-center gap-2">
                <div className="relative">
                  <Button
                    type="button"
                    onClick={() => setOpenReviseMenu((prevOne) => !prevOne)}
                  >
                    Revise
                  </Button>

                  {openReviseMenu && (
                    <div className="absolute top-10 z-10 w-[200px] border border-solid border-gray-200">
                      <button
                        type="button"
                        className="w-full"
                        onClick={() => setRevisionType('revise_bookmarks')}
                      >
                        Revise bookmarked questions
                      </button>
                      <button
                        type="button"
                        className="w-full"
                        onClick={() => setRevisionType('revise_all')}
                      >
                        Revise all questions
                      </button>
                    </div>
                  )}
                </div>
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

            <QuestionsList questions={deckDetail?.questions || []} />
          </div>
        </div>
      )}
    </>
  )
}
