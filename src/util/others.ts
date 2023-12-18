export const getOrdinalNumber = (number: number) => {
  switch (number) {
    case 1:
      return 'a'
    case 2:
      return 'b'
    case 3:
      return 'c'
    case 4:
      return 'd'
    case 5:
      return 'e'
    default:
      throw new Error('Invalid number')
  }
}

export const getResponsivePages = (
  currentIndex: number,
  totalPages: number,
) => {
  let responsivePages = []
  if (totalPages <= 5) {
    for (let index = 0; index < totalPages; index++) {
      responsivePages.push(index + 1)
    }

    return responsivePages
  }
  const currentPage = currentIndex + 1

  if (currentPage <= 4) {
    responsivePages = new Array(5 + 1 + 1).fill(0)
    responsivePages = responsivePages.map((_, index) => {
      if (index + 1 === 6) return -1
      if (index + 1 === 7) return totalPages
      return index + 1
    })

    return responsivePages
  }

  if (currentPage >= totalPages - 3) {
    const base = totalPages - 4
    responsivePages = new Array(5 + 1 + 1).fill(0)
    responsivePages[0] = 1
    responsivePages[1] = -1
    responsivePages[2] = base
    responsivePages[3] = base + 1
    responsivePages[4] = base + 2
    responsivePages[5] = base + 3
    responsivePages[6] = base + 4

    return responsivePages
  }

  responsivePages = new Array(1 + 1 + 1 + 1 + 5).fill(0)
  responsivePages[0] = 1
  responsivePages[1] = -1
  responsivePages[2] = currentPage - 2
  responsivePages[3] = currentPage - 1
  responsivePages[4] = currentPage
  responsivePages[5] = currentPage + 1
  responsivePages[6] = currentPage + 2
  responsivePages[7] = -1
  responsivePages[8] = totalPages

  return responsivePages
}
