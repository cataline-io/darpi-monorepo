const types = [
  'text',
  'number',
  'email',
  'password',
  'textarea',
  'radio',
  'checkbox',
  'checklist',
  'select',
  'switch',
  'file'
] as const

type FieldType = typeof types[number]

const validateFieldType = (value: FieldType) => {
  return types.includes(value)
}

export { validateFieldType, FieldType }
