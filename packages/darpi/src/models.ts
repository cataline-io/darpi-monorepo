import { Error } from '@cataline.io/schema'
import { FieldType } from '@/utils/validateFieldType'

// for user library
export interface FormContext<TValues> {
  readonly fields: TValues
  readonly errors: Error[]
  readonly submitted: boolean
  readonly isValid: boolean
  readonly isLoading: boolean
  resetForm(newValues?: Partial<TValues>): void
  addValue(fields: Partial<TValues>): void
  addError(fields: Partial<TValues>): void
  removeErrors(fieldList?: (keyof Partial<TValues>)[]): void
  enableLoading(): void
  disableLoading(): void
}

export interface Rule {
  name: string
  field: string
  test: (value: string) => Promise<true | string>
}

// share between components
export interface FormData {
  fields: Record<string, any>
  errors: Error[]
  rules: Rule[]
  submitted: boolean
  isValid: boolean
  isLoading: boolean
  watchInPause: boolean
}

export interface Option {
  text: string
  value: string
  chosen?: boolean
  selected?: boolean
  disabled?: boolean
}

export interface FieldProps {
  name: string
  placeholder: string | null
  readonly: boolean
  disabled: boolean
  value: string | number | boolean | any[]
  label: string | null
  text: string | null
  rows: number
  cols: number
  mask: string | null
  options: Option[]
  type: FieldType
  autoMessages: 'on' | 'off'
  rules: Rule['test'][]
  prefix: string
  suffix: string
}
