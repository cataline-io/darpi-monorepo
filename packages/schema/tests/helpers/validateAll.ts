import { Schema, InferType } from '../../src/models'
import validate from '../../src/functions/validate'

type Options = {
  prefix?: string
  schema: Schema | InferType<Schema>
  invalid?: any[]
  valid?: any[]
}

const validateAll = ({ prefix, schema, valid = [], invalid = [] }: Options) => {
  const runValidations = (cases: any[], isValid: boolean) => {
    cases.forEach((value) => {
      let values: Record<string, any> = {
        [Object.keys(schema)[0]]: value
      }

      if (
        typeof value === 'object' &&
        !Array.isArray(value) &&
        value !== null &&
        Object.keys(value).length > 0
      ) {
        values = value
      }

      const { errors } = validate(schema, values)

      const testDescription = `${prefix ? `[${prefix}] ` : ''}should ${
        isValid ? 'succeed' : 'fail'
      } with value ${value}`

      it(testDescription, () => {
        if (isValid) {
          expect(errors).toHaveLength(0)
        } else {
          expect(errors[0]).toMatchObject({
            validation: expect.any(String),
            field: expect.any(String),
            message: expect.any(String)
          })
        }
      })
    })
  }

  describe('valid', () => {
    runValidations(valid, true)
  })

  describe('invalid', () => {
    runValidations(invalid, false)
  })
}

export default validateAll
