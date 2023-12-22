import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { GoKebabHorizontal } from 'react-icons/go'
import { IoMdClose } from 'react-icons/io'
import { LiaPenSolid } from 'react-icons/lia'
import { MdDeleteOutline } from 'react-icons/md'
import QuestionFormForUpdate from '../../components/form/question_form/QuestionFormForUpdate'
import ConfirmModal from '../../components/ui/ConfirmModal'
import Modal from '../../components/ui/Modal'
import Overlay from '../../components/ui/Overlay'
import { useDeleteQuestionMutation } from '../../react_query/questions'
import { Question } from '../../types/deckTypes'
import BackQuestionCard from './BackQuestionCard'
import FrontQuestionCard from './FrontQuestionCard'
interface Props {
  question: Question
}

export default function QuestionItem({ question }: Props) {
  const [openMenu, setOpenMenu] = useState(false)
  const [openUpdateModal, setOpenUpdateModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const closeDeleteModal = () => setOpenDeleteModal(false)

  const { mutate: deleteQuestionMutation } = useDeleteQuestionMutation(
    closeDeleteModal,
    question.deckID,
  )

  const handleDeleteQuestion = (questionID: string) => {
    deleteQuestionMutation(questionID)
  }

  const renderQuestionMenu = () => {
    return (
      <>
        {/* Menu for devices greater than mobile phone */}
        <div className="hidden xl:block">
          <AnimatePresence initial={false} mode="wait">
            {openMenu && (
              <>
                <Overlay onClose={() => setOpenMenu(false)} />
                <motion.div
                  onClick={(e) => e.preventDefault()}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 140, opacity: 1 }}
                  exit={{ x: 100, opacity: 0 }}
                  className="z-20 p-2 rounded-md absolute top-[50%] -translate-y-[50%] right-0 bg-card-light dark:bg-card-dark shadow-custom"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setOpenUpdateModal(true)
                      setOpenMenu(false)
                    }}
                    className="w-full flex items-center justify-start gap-2 hover:bg-slate-100 dark:hover:bg-slate-700 py-2 px-2 rounded-md transition-colors"
                  >
                    <LiaPenSolid className="w-6 h-6 text-text-light dark:text-white" />
                    <p className="text-lg text-text-light dark:text-white font-semibold">
                      Update
                    </p>
                  </button>
                  <button
                    className="w-full flex items-center justify-start gap-2 hover:bg-slate-100 dark:hover:bg-slate-700 py-2 px-2 rounded-md transition-colors"
                    type="button"
                    onClick={() => {
                      setOpenDeleteModal(true)
                      setOpenMenu(false)
                    }}
                  >
                    <MdDeleteOutline className="w-6 h-6 text-red-400" />
                    <p className="text-lg text-red-400 font-semibold">Delete</p>
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {openMenu && (
          <div className="block xl:hidden">
            <Overlay
              className="bg-[#00000079]"
              onClose={() => setOpenMenu(false)}
            />
            <motion.div
              onClick={(e) => e.preventDefault()}
              className={`z-20 fixed top-[70%]  left-0 right-0 bottom-0 bg-primary-light dark:bg-primary-dark cursor-auto`}
            >
              <div className="flex items-center justify-between p-4">
                <h2 className="text-title-light dark:text-title-dark text-lg font-semibold">
                  Question Title
                </h2>
                <button
                  onClick={() => setOpenMenu(false)}
                  className="rounded-full bg-gray-200 dark:bg-gray-700"
                >
                  <IoMdClose className="w-6 h-6 text-text-light dark:text-text-dark" />
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setOpenUpdateModal(true)
                    setOpenMenu(false)
                  }}
                  className="w-full flex items-center justify-start gap-2 hover:bg-slate-100 dark:hover:bg-slate-700 py-2 px-2 rounded-none xl:rounded-md transition-colors"
                >
                  <LiaPenSolid className="w-5 h-5 text-text-light dark:text-white" />
                  <p className=" text-text-light dark:text-white font-semibold">
                    Update
                  </p>
                </button>
                <button
                  className="w-full flex items-center justify-start gap-2 hover:bg-slate-100 dark:hover:bg-slate-700 py-2 px-2  rounded-none xl:rounded-md transition-colors"
                  type="button"
                  onClick={() => {
                    setOpenDeleteModal(true)
                    setOpenMenu(false)
                  }}
                >
                  <MdDeleteOutline className="w-5 h-5 text-red-400" />
                  <p className=" text-red-400 font-semibold">Delete</p>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </>
    )
  }

  return (
    <>
      <AnimatePresence initial={false} mode="wait">
        {openUpdateModal && (
          <Modal
            className="w-full sm:w-[600px] min:h-[600px]"
            onClose={() => setOpenUpdateModal(false)}
          >
            <QuestionFormForUpdate
              oldQuestion={question}
              onClose={() => setOpenUpdateModal(false)}
            />
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false} mode="wait">
        {openDeleteModal && (
          <ConfirmModal
            deletedID={question.questionID}
            onClose={closeDeleteModal}
            onDelete={handleDeleteQuestion}
            title="Delete Question?"
            description="You will no longer see this question."
          />
        )}
      </AnimatePresence>

      <div className="rounded-md group relative mb-5 shadow-custom bg-card-light dark:bg-card-dark">
        <div className="flex flex-col sm:flex-row">
          <FrontQuestionCard
            question={question}
            textSize="text-base"
            rootClassName="w-full mt-3 sm:mt-0 border-b-[1px] sm:border-b-[0] sm:border-r-[1px] border-solid border-gray-200 dark:border-gray-600"
          />
          <BackQuestionCard
            question={question}
            textSize="text-base"
            rootClassName="w-full  "
          />
        </div>

        <button
          onClick={() => setOpenMenu((prevOne) => !prevOne)}
          type="button"
          className="absolute top-[20px] sm:top-[50%] right-2 -translate-y-[50%] opacity-100 sm:opacity-0 sm:group-hover:opacity-100 p-[6px] rounded-md hover:bg-gray-200 hover:dark:bg-gray-700 transition-all duration-200"
        >
          <GoKebabHorizontal className="w-5 h-5 text-primary-dark dark:text-primary-light" />
        </button>
        {renderQuestionMenu()}
      </div>
    </>
  )
}
