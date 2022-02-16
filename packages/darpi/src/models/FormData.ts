import Rule from '@/models/Rule'
import { Error } from '@cataline.io/schema'

export default interface FormData {
  fields: Record<string, any>
  errors: Error[]
  rules: Rule[]
  submitted: boolean
  isValid: boolean
  isLoading: boolean
  watchInPause: boolean
}
