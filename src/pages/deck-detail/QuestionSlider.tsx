import { useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

interface Props {
  items: string[]
  rootClassName?: string
}

export default function QuestionSlider({
  items,
  rootClassName = 'w-[700px] h-[500px]',
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const showPrevCard = () => {
    setCurrentIndex((prevOne) => {
      const isAtFirstCard = prevOne === 0
      const lastIndex = items.length - 1
      if (isAtFirstCard) return lastIndex
      return prevOne - 1
    })
  }

  const showNextCard = () => {
    setCurrentIndex((prevOne) => {
      const isAtLastCard = prevOne === items.length - 1
      if (isAtLastCard) return 0
      return prevOne + 1
    })
  }

  return (
    <div className={`${rootClassName}`}>
      <div className="w-full h-full flex overflow-hidden">
        {items.map((item, i) => (
          <div
            key={i}
            className="min-w-full  h-full"
            style={{
              translate: `${-100 * currentIndex}%`,
              transition: 'translate 300ms',
            }}
          >
            <div className="w-full h-full bg-gray-200">{item}</div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <button
          onClick={showPrevCard}
          className="rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <IoIosArrowBack className="w-6 h-6 text-title-light dark:text-title-dark" />
        </button>
        <div className="flex items-center justify-center gap-2">
          {items.map((_, index) => (
            <button
              className={`flex items-center justify-center p-4 rounded-full w-6 h-6 font-medium border border-solid    ${
                currentIndex === index
                  ? 'bg-card-dark dark:bg-card-light text-white dark:text-primary-dark border-transparent'
                  : 'bg-card-light dark:bg-card-dark text-text-light dark:text-text-dark border-gray-200 dark:border-gray-600'
              }`}
              onClick={() => setCurrentIndex(index)}
              key={index}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          onClick={showNextCard}
          className="rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <IoIosArrowForward className="w-6 h-6 text-title-light dark:text-title-dark" />
        </button>
      </div>
    </div>
  )
}
