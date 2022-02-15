import MixedSchema from '@/rules/mixed'
import { config } from '@/configure'
import typeOf from '@/utils/typeOf'

class BooleanSchema<T extends boolean | undefined> extends MixedSchema<T> {
  constructor(message?: string) {
    super()

    this.isBoolean(message)
  }

  private isBoolean(message?: string) {
    this.validations.push({
      name: 'isBoolean',
      message: message || config.messages.boolean.isBoolean,
      test: (value: unknown) => {
        return ['boolean', 'null'].includes(typeOf(value))
      }
    })
  }
}

export default BooleanSchema
