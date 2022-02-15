import { Schema } from '@cataline.io/schema'

interface Options {
  schema: Schema
  fieldName: string
  fieldValue: string
}

const valueTransformer = (options: Options) => {
  const { schema, fieldName, fieldValue } = options
  const schemaName = schema[fieldName].constructor.name

  if (fieldValue === null) return null

  if (schemaName === 'NumberSchema') {
    return parseFloat(fieldValue)
  }

  if (schemaName === 'BooleanSchema') {
    return JSON.parse(fieldValue)
  }

  return fieldValue
}

export default valueTransformer
