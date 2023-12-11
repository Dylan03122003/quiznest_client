import QuestionSlider from '../pages/deck-detail/QuestionSlider'

const Test = () => {
  const titles = ['Title 1', 'Title 2', 'Title 3', 'Title 4', 'Title 5']

  return (
    <div className="h-screen p-10 bg-primary-light dark:bg-primary-dark">
      <QuestionSlider items={titles} />
    </div>
  )
}

export default Test
