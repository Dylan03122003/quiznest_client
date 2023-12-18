import { useState } from 'react'
import FlippableCard from '../../components/ui/flippable-card/FlippableCard'
import { Question } from '../../types/deckTypes'
import BackQuestionCard from './BackQuestionCard'
import FrontQuestionCard from './FrontQuestionCard'
import QuestionPagination from './QuestionPagination'

interface Props {
  questions: Question[]
  rootClassName?: string
}

export default function QuestionSlider({
  questions,
  rootClassName = 'w-[700px] h-[500px]',
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const showPrevCard = () => {
    setCurrentIndex((prevOne) => {
      const isAtFirstCard = prevOne === 0
      const lastIndex = questions.length - 1
      if (isAtFirstCard) return lastIndex
      return prevOne - 1
    })
  }

  const showNextCard = () => {
    setCurrentIndex((prevOne) => {
      const isAtLastCard = prevOne === questions.length - 1
      if (isAtLastCard) return 0
      return prevOne + 1
    })
  }

  return (
    <div className={`${rootClassName}`}>
      <div className="w-full h-full flex overflow-hidden ">
        {questions.map((question, i) => (
          <div
            key={question.questionID}
            className="min-w-full  h-full"
            style={{
              translate: `${-100 * currentIndex}%`,
              transition: 'translate 300ms',
            }}
          >
            <FlippableCard
              reset={currentIndex !== i} // always reset hidden cards
              rootClassName="w-full h-full "
              frontCardElement={<FrontQuestionCard question={question} />}
              backCardElement={<BackQuestionCard question={question} />}
            />
          </div>
        ))}
      </div>

      <QuestionPagination
        currentIndex={currentIndex}
        onSetCurrentIndex={setCurrentIndex}
        onShowNextCard={showNextCard}
        onShowPrevCard={showPrevCard}
        questionSize={questions.length}
      />
    </div>
  )
}
