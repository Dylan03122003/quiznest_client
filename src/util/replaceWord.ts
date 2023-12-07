export const replaceWord = (originalText: string, targetText: string) => {
  // I love you so much and I love fucking you
  // I love fucking
  let startIndex = originalText.indexOf(targetText)
  const textArr = originalText.split('')
  let count = 0
  while (count < targetText.length) {
    textArr[startIndex] = '_'
    startIndex++
    count++
  }
  return textArr.join('')
}
