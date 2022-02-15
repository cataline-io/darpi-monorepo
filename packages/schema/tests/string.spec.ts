import { schema } from '../src'
import validateAll from './helpers/validateAll'

describe('isString', () => {
  validateAll({
    schema: { text: schema.string() },
    valid: ['22', 'hey', ''],
    invalid: [-1, 0, 10, true, false, {}, [], undefined]
  })
})

describe('email', () => {
  validateAll({
    schema: { text: schema.string().email() },
    valid: ['hi@cataline.io'],
    invalid: [
      'hi@',
      'hi@cataline',
      'hi@cataline.',
      '@cataline.io',
      'hi@ cataline.io',
      'hi @cataline.io',
      'hi@cataline .io',
      'hi@cataline. io'
    ]
  })
})

describe('url', () => {
  validateAll({
    schema: { text: schema.string().url() },
    valid: ['https://cataline.io', 'https://www.cataline.io/test'],
    invalid: ['cataline.io', 'this is not a url']
  })
})

describe('length', () => {
  validateAll({
    schema: { text: schema.string().length(3) },
    valid: ['hey'],
    invalid: ['hi', 'hello', '3']
  })
})

describe('minLength', () => {
  validateAll({
    schema: { text: schema.string().minLength(3) },
    valid: ['hey', 'hello', 'hello world'],
    invalid: ['', '3', 'ok']
  })
})

describe('maxLength', () => {
  validateAll({
    schema: { text: schema.string().maxLength(3) },
    valid: ['', 'ok', 'hey'],
    invalid: ['hello']
  })
})

describe('minWords', () => {
  validateAll({
    schema: { text: schema.string().minWords(2) },
    valid: ['hello world', 'good see you'],
    invalid: ['ok']
  })
})

describe('maxWords', () => {
  validateAll({
    schema: { text: schema.string().maxWords(2) },
    valid: ['ok', 'hello world'],
    invalid: ['good see you']
  })
})

describe('first', () => {
  validateAll({
    schema: { text: schema.string().first('h') },
    valid: ['hello'],
    invalid: ['bah']
  })
})

describe('last', () => {
  validateAll({
    schema: { text: schema.string().last('o') },
    valid: ['hello'],
    invalid: ['bah']
  })
})

describe('onlyNumbers', () => {
  validateAll({
    schema: { text: schema.string().onlyNumbers() },
    valid: ['234'],
    invalid: ['abc', '94a']
  })
})

describe('onlyNumbers', () => {
  validateAll({
    schema: { text: schema.string().notOnlyNumbers() },
    valid: ['abc', '523a'],
    invalid: ['123']
  })
})

describe('cpf', () => {
  validateAll({
    schema: { text: schema.string().cpf() },
    valid: ['453.178.287-91', '825.566.405-02', '875.189.681-85'],
    invalid: ['123.456.789-12', '82312321312', '875.189.681-86']
  })
})
