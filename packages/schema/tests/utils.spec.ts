import typeOf from '../src/utils/typeOf'
import keysMatch from '../src/utils/keysMatch'
import validateSize from '../src/utils/validateSize'

describe('typeOf', () => {
  it('should work as expected', () => {
    expect(typeOf('')).toBe('string')
    expect(typeOf('hey')).toBe('string')

    expect(typeOf(0)).toBe('number')
    expect(typeOf(-1)).toBe('number')
    expect(typeOf(3)).toBe('number')
    expect(typeOf(9.5)).toBe('number')

    expect(typeOf(true)).toBe('boolean')
    expect(typeOf(false)).toBe('boolean')

    expect(typeOf({})).toBe('object')
    expect(typeOf({ x: 'y' })).toBe('object')

    expect(typeOf([])).toBe('array')
    expect(typeOf([{}])).toBe('array')
    expect(typeOf([[]])).toBe('array')
    expect(typeOf([1, 2])).toBe('array')
    expect(typeOf(['foo'])).toBe('array')

    expect(typeOf(null)).toBe('null')

    expect(typeOf(undefined)).toBe('undefined')

    expect(typeOf(new Error())).toBe('unknown')
  })
})

describe('keysMatch', () => {
  it('should work as expected', () => {
    expect(keysMatch({}, {})).toBe(true)
    expect(keysMatch({ x: null }, { x: null })).toBe(true)
    expect(keysMatch({ x: null }, { y: null })).toBe(false)
  })
})

describe('validateSize', () => {
  it('should work as expected', () => {
    expect(validateSize({ bytes: 1000000, reference: '1mb' })).toBe(true)
    expect(validateSize({ bytes: 10000000, reference: '10mb' })).toBe(true)
    expect(validateSize({ bytes: 1000000000, reference: '1gb' })).toBe(true)
    expect(validateSize({ bytes: 1000000000, reference: '500mb' })).toBe(false)
    expect(validateSize({ bytes: 10000000, reference: '5mb' })).toBe(false)
  })
})
