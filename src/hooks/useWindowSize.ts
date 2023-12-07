import { useEffect, useState } from 'react'

type WindowSize = 'isExactSm' | 'isSm' | 'isMd' | 'isLg' | 'isXl' | 'is2Xl'

export const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ])

  const windowWidth = windowSize[0]

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight])
    }

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  if (windowWidth < 640) return 'isExactSm'

  if (windowWidth >= 640 && windowWidth < 768) return 'isSm'

  if (windowWidth >= 768 && windowWidth < 1024) return 'isMd'

  if (windowWidth >= 1024 && windowWidth < 1280) return 'isLg'

  if (windowWidth >= 1280 && windowWidth < 1536) return 'isXl'

  if (windowWidth >= 1536) return 'is2Xl'

  return 'isXl'
}
