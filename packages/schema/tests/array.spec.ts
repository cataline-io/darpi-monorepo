import { schema } from '../src'
import validateAll from './helpers/validateAll'

describe('isArray', () => {
  validateAll({
    schema: { field: schema.array() },
    valid: [[1, 2, 3], ['foo', 'bar'], [], [{}], [[]]],
    invalid: [-156, 0, 1, '18', '', {}, undefined]
  })
})

describe('minLength', () => {
  validateAll({
    schema: { field: schema.array().minLength(2) },
    valid: [['foo', 'bar']],
    invalid: [[], [{}], [[]]]
  })
})

describe('maxLength', () => {
  validateAll({
    schema: { field: schema.array().maxLength(2) },
    valid: [['foo', 'bar']],
    invalid: [[1, 2, 3]]
  })
})
