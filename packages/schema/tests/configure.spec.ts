import { schema, validate, configure } from '../src'
import allMessages from '../src/messages/all'

describe('configure', () => {
  it('should have english language set by default', () => {
    const fields = { age: schema.number() }
    const values = { age: 'John' }

    const { errors } = validate(fields, values)

    expect(errors[0].message).toEqual(allMessages.en.number.isNumber)
  })

  it('should be able to define new languages', () => {
    configure({
      language: 'ptBR'
    })

    const fields = { age: schema.number() }
    const values = { age: '18' }

    const { errors } = validate(fields, values)

    expect(errors[0].message).toEqual(allMessages.ptBR.number.isNumber)
  })

  it('should be able to define custom messages', () => {
    configure({
      messages: {
        number: {
          isNumber: 'error message'
        }
      }
    })

    const fields = { age: schema.number() }
    const values = { age: '18' }

    const { errors } = validate(fields, values)

    expect(errors[0].message).toEqual('error message')
  })
})
