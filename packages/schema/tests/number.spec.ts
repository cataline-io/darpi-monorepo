import { schema } from '../src'
import validateAll from './helpers/validateAll'

describe('isNumber', () => {
  validateAll({
    schema: { number: schema.number() },
    valid: [18, 0, 1.5],
    invalid: ['18', '', true, false, {}, [], undefined]
  })
})

describe('length', () => {
  validateAll({
    schema: { number: schema.number().length(3) },
    valid: [957],
    invalid: [3, 71, 5831]
  })
})

describe('max', () => {
  validateAll({
    schema: { number: schema.number().max(15) },
    valid: [-15, -1, 0, 14, 15],
    invalid: [16, 20]
  })
})

describe('min', () => {
  validateAll({
    schema: { number: schema.number().min(15) },
    valid: [15, 16, 83273827],
    invalid: [-2, 2, 14]
  })
})

describe('negative', () => {
  validateAll({
    schema: { number: schema.number().negative() },
    valid: [-4, -99],
    invalid: [0, 1, 55]
  })
})

describe('positive', () => {
  validateAll({
    schema: { number: schema.number().positive() },
    valid: [1, 993939],
    invalid: [0, -99]
  })
})

describe('between', () => {
  validateAll({
    schema: { number: schema.number().between(10, 20) },
    valid: [10, 11, 15, 20],
    invalid: [-1, 0, 9, 21]
  })
})
