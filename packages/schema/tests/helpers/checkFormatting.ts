import { Schema, InferType } from '../../src/models'
import validate from '../../src/functions/validate'

type Options = {
  description: string
  schema: Schema | InferType<Schema>
  value: any
  result: any
}

const checkFormatting = ({ description, schema, value, result }: Options) => {
  it(description, () => {
    const fieldName = Object.keys(schema)[0]

    const { formattedValues } = validate(schema, {
      [fieldName]: value
    })

    expect(formattedValues[fieldName]).toEqual(result)
  })
}

export default checkFormatting
