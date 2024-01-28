import { getOrdinalNumber } from './others'

describe('getOrdinalNumber', () => {
  it('should return "a" when number is 1', () => {
    expect(getOrdinalNumber(1)).toBe('a')
  })

  it('should return "b" when number is 2', () => {
    expect(getOrdinalNumber(2)).toBe('b')
  })

  it('should return "c" when number is 3', () => {
    expect(getOrdinalNumber(3)).toBe('c')
  })

  it('should return "d" when number is 4', () => {
    expect(getOrdinalNumber(4)).toBe('d')
  })

  it('should return "e" when number is 5', () => {
    expect(getOrdinalNumber(5)).toBe('e')
  })

  it('should throw an error when number is invalid', () => {
    expect(() => {
      getOrdinalNumber(6)
    }).toThrow('Invalid number')
  })
})
