import { Error } from '@cataline.io/schema'

export default interface FormContext<TValues> {
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
