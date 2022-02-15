/* eslint-disable no-use-before-define */
import { config } from '@/configure'
import { Validation, Formatting } from '@/models'
import StringSchema from '@/rules/string'
import NumberSchema from '@/rules/number'
import ArraySchema from '@/rules/array'
import FileSchema from '@/rules/file'

type Specify<C extends MixedSchema<any>, T> = C extends NumberSchema<any>
  ? NumberSchema<Extract<T, number | undefined>>
  : C extends StringSchema<any>
  ? StringSchema<Extract<T, string | undefined>>
  : C extends ArraySchema<any>
  ? ArraySchema<Extract<T, any[] | undefined>>
  : C extends FileSchema<any>
  ? FileSchema<Extract<T, File | undefined>>
  : MixedSchema<T>

class MixedSchema<T> {
  type!: T
  readonly validations: Validation[] = []
  readonly formattings: Formatting[] = []

  required(message?: string): Specify<this, Exclude<T, undefined>> {
    this.validations.push({
      name: 'required',
      message: message || config.messages.mixed.required,
      test: (value: any) => {
        if ([null, undefined, ''].includes(value)) {
          return false
        }

        return true
      }
    })

    return this as any
  }

  oneOf<U extends T>(
    arrayOfValues: U[],
    message?: string
  ): Specify<this, U | Extract<undefined, T>> {
    type Params = { arrayOfValues: any[] }

    this.validations.push({
      name: 'oneOf',
      params: { arrayOfValues: arrayOfValues.join(', ') },
      message: message || config.messages.mixed.oneOf,
      test: (value: any, params: Params) => {
        return params.arrayOfValues.includes(value)
      }
    })

    return this as any
  }

  confirmed(reference: string, message?: string) {
    type Params = {
      reference: string
      allFields: {
        [key: string]: any
      }
    }

    this.validations.push({
      name: 'confirmed',
      params: { reference },
      message: message || config.messages.mixed.confirmed,
      test: (value: any, params: Params) => {
        const { reference, allFields } = params

        if (allFields[reference] === undefined) {
          console.error('wrong reference for confirmation')

          return false
        }

        return value === allFields[reference]
      }
    })

    return this
  }

  equal(value: any, message?: string) {
    type Params = {
      value: any
    }

    this.validations.push({
      name: 'equal',
      params: { value },
      message: message || config.messages.mixed.equal,
      test: (value: any, params: Params) => {
        return value === params.value
      }
    })

    return this
  }
}

export default MixedSchema
