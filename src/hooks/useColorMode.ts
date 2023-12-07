import { useEffect } from 'react'
import { useLocalStorage } from '../util/useLocalStorage'

function useColorMode() {
  const [colorMode, setColorMode] = useLocalStorage<string>(
    'color-mode-quiznest',
    'light',
  )

  useEffect(() => {
    const className = 'dark'
    const bodyClasses = window.document.body.classList

    if (colorMode === 'dark') {
      bodyClasses.add(className)
    } else {
      bodyClasses.remove(className)
    }
  }, [colorMode])

  return [colorMode, setColorMode] as [typeof colorMode, typeof setColorMode]
}

export default useColorMode
