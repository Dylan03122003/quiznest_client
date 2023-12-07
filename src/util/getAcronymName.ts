export const getAcronymName = (name: string) => {
  const splitName = name.split(' ')
  const cutName = [splitName[0]]
  if (splitName.length > 1) cutName.push(splitName[splitName.length - 1])
  const acronym = cutName
    .map((word) => {
      return word[0].toUpperCase()
    })
    .join('')

  return acronym
}
