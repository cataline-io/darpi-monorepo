import { schema } from '../src'
import validateAll from './helpers/validateAll'

describe('required', () => {
  validateAll({
    prefix: 'string',
    schema: { name: schema.string().required() },
    valid: ['ok'],
    invalid: ['', null]
  })

  validateAll({
    prefix: 'number',
    schema: { name: schema.number().required() },
    valid: [-1, 0, 3, 199191],
    invalid: [null]
  })

  validateAll({
    prefix: 'boolean',
    schema: { name: schema.boolean().required() },
    valid: [true, false],
    invalid: [null]
  })
})

describe('oneOf', () => {
  validateAll({
    prefix: 'string',
    schema: { name: schema.string().oneOf(['hey', 'hello']) },
    valid: ['hey', 'hello'],
    invalid: ['anything']
  })

  validateAll({
    prefix: 'number',
    schema: { name: schema.number().oneOf([15, 18]) },
    valid: [15, 18],
    invalid: [-1, 0, 30]
  })

  validateAll({
    prefix: 'boolean',
    schema: { name: schema.boolean().oneOf([true, false]) },
    valid: [true, false],
    invalid: [undefined, 'true', 'false']
  })
})

describe('confirmed', () => {
  validateAll({
    prefix: 'string',
    schema: {
      text: schema.string(),
      textConfirmation: schema.string().confirmed('text')
    },
    valid: [{ text: 'abc', textConfirmation: 'abc' }],
    invalid: [{ text: 'abc', textConfirmation: 'anything' }]
  })

  validateAll({
    prefix: 'number',
    schema: {
      number: schema.number(),
      numberConfirmation: schema.number().confirmed('number')
    },
    valid: [{ number: 15, numberConfirmation: 15 }],
    invalid: [{ number: 15, numberConfirmation: 18 }]
  })

  validateAll({
    prefix: 'boolean',
    schema: {
      condition: schema.boolean(),
      conditionConfirmation: schema.boolean().confirmed('condition')
    },
    valid: [{ condition: false, conditionConfirmation: false }],
    invalid: [{ condition: true, conditionConfirmation: false }]
  })
})

describe('equal', () => {
  validateAll({
    prefix: 'string',
    schema: { text: schema.string().equal('foo') },
    valid: ['foo'],
    invalid: ['any']
  })

  validateAll({
    prefix: 'number',
    schema: { number: schema.number().equal(9) },
    valid: [9],
    invalid: [-9, 0, 8, 10]
  })

  validateAll({
    prefix: 'boolean',
    schema: {
      condition: schema.boolean().equal(true)
    },
    valid: [true],
    invalid: [false]
  })
})
