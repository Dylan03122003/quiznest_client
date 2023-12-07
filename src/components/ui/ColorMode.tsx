import { BsMoonStars, BsSun } from 'react-icons/bs'
import useColorMode from '../../hooks/useColorMode'
const ColorMode = () => {
  const [colorMode, setColorMode] = useColorMode()

  return (
    <button
      className=""
      onClick={() => setColorMode(colorMode === 'light' ? 'dark' : 'light')}
    >
      {colorMode === 'dark' && (
        <BsMoonStars className="text-[#0EA5E9] h-5 w-5" />
      )}
      {colorMode === 'light' && <BsSun className="text-[#0EA5E9] h-5 w-5" />}
    </button>
  )
}
// 0EA5E9
// gray: 14344C
export default ColorMode
