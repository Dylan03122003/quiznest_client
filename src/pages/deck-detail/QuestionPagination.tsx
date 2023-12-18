import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { getResponsivePages } from '../../util/others'

interface Props {
  questionSize: number
  currentIndex: number
  onShowPrevCard: () => void
  onShowNextCard: () => void
  onSetCurrentIndex: (index: number) => void
}

export default function QuestionPagination({
  questionSize,
  currentIndex,
  onShowNextCard,
  onShowPrevCard,
  onSetCurrentIndex,
}: Props) {
  const responsivePages = getResponsivePages(currentIndex, questionSize)

  const renderPageButton = (page: number, index: number) => {
    if (page === -1)
      return (
        <button
          className={`flex items-center justify-center rounded-full w-8 h-8 font-medium border border-solid pointer-events-none   ${
            currentIndex === page - 1
              ? 'bg-card-dark dark:bg-card-light text-white dark:text-primary-dark border-transparent'
              : 'bg-card-light dark:bg-card-dark text-text-light dark:text-text-dark border-gray-200 dark:border-gray-600'
          }`}
          key={index}
        >
          <HiOutlineDotsHorizontal className="text-gray-500 dark:text-white w-4 h-4" />
        </button>
      )

    return (
      <button
        className={`flex items-center justify-center p-4 rounded-full w-6 h-6 font-medium border border-solid    ${
          currentIndex === page - 1
            ? 'bg-card-dark dark:bg-card-light text-white dark:text-primary-dark border-transparent'
            : 'bg-card-light dark:bg-card-dark text-text-light dark:text-text-dark border-gray-200 dark:border-gray-600'
        }`}
        onClick={() => {
          onSetCurrentIndex(page - 1)
        }}
        key={index}
      >
        {page}
      </button>
    )
  }

  return (
    <div className="mt-5 flex items-center justify-between">
      <button
        onClick={onShowPrevCard}
        className="rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <IoIosArrowBack className="w-6 h-6 text-title-light dark:text-title-dark" />
      </button>
      <div className="hidden sm:flex items-center justify-center gap-2">
        {responsivePages.map((page, index) => renderPageButton(page, index))}
      </div>
      <button
        onClick={onShowNextCard}
        className="rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <IoIosArrowForward className="w-6 h-6 text-title-light dark:text-title-dark" />
      </button>
    </div>
  )
}
