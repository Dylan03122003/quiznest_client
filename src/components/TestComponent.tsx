import { useWindowSize } from '../hooks/useWindowSize'

const Dropdown = () => {
  const windowSize = useWindowSize()

  return (
    <div>
      <h2>{windowSize}</h2>
    </div>
  )
}

export default Dropdown
