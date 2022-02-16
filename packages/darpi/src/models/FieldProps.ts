import { FieldType } from '@/utils/validateFieldType'
import Option from '@/models/Option'
import Rule from '@/models/Rule'

export default interface FieldProps {
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
