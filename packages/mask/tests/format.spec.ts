import format from '../src/functions/format'

describe('format function', () => {
  it('should format the values according to mask pattern', () => {
    expect(format('19121996', '99/99/9999')).toEqual('19/12/1996')
    expect(format('81981355566', '(99) 99999-9999')).toEqual('(81) 98135-5566')
    expect(format('abc1d23', 'AAA-9A99')).toEqual('abc-1d23')
    expect(format('a1c23d4f', '****.**.**')).toEqual('a1c2.3d.4f')
    expect(format('10a1ok', '--99--**--AA//')).toEqual('--10--a1--ok//')
  })

  it('should not allow special characters', () => {
    expect(format('!@#$%^&*().,_+><[]/{}', '*********************')).toEqual('')
  })

  it('should not exceed the length of mask pattern', () => {
    expect(format('123456789', '99')).toEqual('12')
  })

  it('should exclude special characters from end incomplete text', () => {
    expect(format('fo!', 'AAA!')).toEqual('fo')
    expect(format('5.82', '9.999,99')).toEqual('5.82')
  })

  it('should not contain duplicate special characters', () => {
    expect(format('19/12/1996', '99/99/9999')).toEqual('19/12/1996')
    expect(format('ab.12', 'AA.99')).toEqual('ab.12')
  })

  it('should fill with the next compatible key', () => {
    expect(format('abc1', 'AA99')).toEqual('ab1')
    expect(format('12ab', 'AA99')).toEqual('ab')
    expect(format('ok/12/ab', '**/AA/99')).toEqual('ok/ab')
  })
})
