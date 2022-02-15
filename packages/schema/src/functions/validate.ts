import { Schema, Error, InferType } from '@/models'
import interpolate from '@/utils/interpolate'
import keysMatch from '@/utils/keysMatch'
// import typeOf from '@/utils/typeOf'

interface Options {
  schema: Schema | InferType<Schema>
  values: Record<string, any>
}

const validate = (schema: Options['schema'], values: Options['values']) => {
  const errors: Error[] = []
  const formattedValues = { ...values }

  if (!keysMatch(schema, values)) {
    throw new Error('schema and values dont match')
  }

  Object.keys(schema).forEach((field) => {
    const valueIsNull = values[field] === null
    const isRequired = schema[field].validations.some(({ name }) => {
      return name === 'required'
    })

    // if the value is empty and not required
    // don't make any validation or formatting
    if (valueIsNull && !isRequired) return

    // if required, brings the required validation to the start of validations
    if (isRequired) {
      schema[field].validations = [
        schema[field].validations.find(({ name }) => name === 'required')!,
        ...schema[field].validations.filter(({ name }) => name !== 'required')
      ]
    }

    schema[field].validations.forEach((validation) => {
      const { name, message, params, test } = validation

      const pushError = () => {
        errors.push({
          validation: name,
          field: field,
          message: interpolate(message, { field, ...params })
        })
      }

      if (valueIsNull) {
        return pushError()
      }

      if (!test(values[field], { ...params, allFields: values })) {
        return pushError()
      }
    })

    // if has error, don't make formations
    if (errors.length > 0) return

    schema[field].formattings.forEach((formatting) => {
      const { params, format } = formatting

      formattedValues[field] = format(values[field], params)
    })
  })

  return { errors, formattedValues }
}

export default validate
