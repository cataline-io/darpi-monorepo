import { schema } from '../src'
import validateAll from './helpers/validateAll'

describe('isBoolean', () => {
  validateAll({
    schema: { field: schema.boolean() },
    valid: [true, false],
    invalid: [-156, 0, 1, '18', '', {}, [], undefined]
  })
})
