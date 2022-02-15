import MixedSchema from '@/rules/mixed'
import { config } from '@/configure'
import typeOf from '@/utils/typeOf'

class ArraySchema<T extends any[] | undefined> extends MixedSchema<T> {
  constructor(message?: string) {
    super()

    this.isArray(message)
  }

  private isArray(message?: string) {
    this.validations.push({
      name: 'isArray',
      message: message || config.messages.array.isArray,
      test: (value: unknown) => {
        return ['array', 'null'].includes(typeOf(value))
      }
    })
  }

  minLength(minLength: number, message?: string) {
    type Params = { minLength: number }

    this.validations.push({
      name: 'minLength',
      params: { minLength },
      message: message || config.messages.array.minLength,
      test: (value: [], { minLength }: Params) => {
        return value.length >= minLength
      }
    })

    return this
  }

  maxLength(maxLength: number, message?: string) {
    type Params = { maxLength: number }

    this.validations.push({
      name: 'maxLength',
      params: { maxLength },
      message: message || config.messages.array.maxLength,
      test: (value: [], { maxLength }: Params) => {
        return value.length <= maxLength
      }
    })

    return this
  }
}

export default ArraySchema
