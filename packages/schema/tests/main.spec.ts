import { schema, validate } from '../src'
import enMessages from '../src/messages/en'

describe('main', () => {
  const testSchema = {
    name: schema.string(),
    age: schema.number(),
    isHuman: schema.boolean()
  }

  const values = {
    name: 'John Doe',
    age: 18,
    isHuman: true
  }

  it('should fail when values object does not match schema', () => {
    const fn = () => {
      validate(testSchema, {
        fullName: 'John Doe',
        myAge: 18
      })
    }

    expect(fn).toThrowError('schema and values dont match')
  })

  it('should return values correctly after validation', () => {
    const { errors, formattedValues } = validate(testSchema, values)

    expect(errors).toHaveLength(0)
    expect(formattedValues.name).toEqual(values.name)
    expect(formattedValues.age).toEqual(values.age)
    expect(formattedValues.isHuman).toEqual(values.isHuman)
  })

  it('should have correct error structure', () => {
    const { errors } = validate(testSchema, {
      ...values,
      age: 'invalid value'
    })

    expect(errors).toHaveLength(1)
    expect(errors[0]).toMatchObject({
      validation: 'isNumber',
      field: 'age',
      message: enMessages.number.isNumber
    })
  })

  it('should be able to configure custom messages for each field', () => {
    const testSchema = {
      name: schema.string('string test'),
      age: schema.number('number test'),
      isHuman: schema.boolean('boolean test')
    }

    const { errors } = validate(testSchema, {
      name: 10,
      age: '18',
      isHuman: 'true'
    })

    expect(errors[0].message).toEqual('string test')
    expect(errors[1].message).toEqual('number test')
    expect(errors[2].message).toEqual('boolean test')
  })
})
