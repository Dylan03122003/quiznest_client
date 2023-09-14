import DeckList from '../../components/deck/DeckList'

const HomePage = () => {
  return (
    <div className="p-2">
      <h1 className="text-center mb-10 font-bold text-blue-400 text-4xl">
        Home
      </h1>
      <DeckList />
    </div>
  )
}

export default HomePage
