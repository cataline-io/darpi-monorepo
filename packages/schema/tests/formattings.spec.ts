import { schema } from '../src'
import checkFormatting from './helpers/checkFormatting'

describe('number', () => {
  checkFormatting({
    description: 'round closer',
    schema: { number: schema.number().round('closer') },
    value: 5.3,
    result: 5
  })

  checkFormatting({
    description: 'round toDown',
    schema: { number: schema.number().round('toDown') },
    value: 3.9,
    result: 3
  })

  checkFormatting({
    description: 'round toUp',
    schema: { number: schema.number().round('toUp') },
    value: 3.1,
    result: 4
  })
})

describe('string', () => {
  checkFormatting({
    description: 'lowercase',
    schema: { number: schema.string().lowercase() },
    value: 'HELLO',
    result: 'hello'
  })

  checkFormatting({
    description: 'uppercase',
    schema: { number: schema.string().uppercase() },
    value: 'hey',
    result: 'HEY'
  })

  checkFormatting({
    description: 'trim',
    schema: { number: schema.string().trim() },
    value: '  anything   ',
    result: 'anything'
  })
})
