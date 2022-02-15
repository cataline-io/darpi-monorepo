import StringSchema from '@/rules/string'
import NumberSchema from '@/rules/number'
import BooleanSchema from '@/rules/boolean'
import FileSchema from '@/rules/file'
import ArraySchema from '@/rules/array'

import { InferType } from '@/models'

const schema = {
  string(message?: string) {
    return new StringSchema(message)
  },
  number(message?: string) {
    return new NumberSchema(message)
  },
  boolean(message?: string) {
    return new BooleanSchema(message)
  },
  array(message?: string) {
    return new ArraySchema(message)
  },
  file(message?: string) {
    return new FileSchema(message)
  },
  typed<T>(shape: T) {
    return shape as InferType<typeof shape>
  }
}

export default schema
