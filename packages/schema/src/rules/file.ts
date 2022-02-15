import MixedSchema from '@/rules/mixed'
import { config } from '@/configure'
import validateSize from '@/utils/validateSize'

class FileSchema<T extends File | undefined> extends MixedSchema<T> {
  constructor(message?: string) {
    super()

    this.isFile(message)
  }

  private isFile(message?: string) {
    this.validations.push({
      name: 'isFile',
      message: message || config.messages.file.isFile,
      test: (value: unknown) => {
        return (value instanceof File)
      }
    })
  }

  extnames(extnames: string[], message?: string) {
    type Params = { extnames: string }

    this.validations.push({
      name: 'extnames',
      params: { extnames: extnames.join(', ') },
      message: message || config.messages.file.extnames,
      test: (value: File, params: Params) => {
        return params.extnames.includes(value.name.split('.').pop()!)
      }
    })

    return this
  }

  size(size: string, message?: string) {
    type Params = { size: string }

    this.validations.push({
      name: 'size',
      params: { size },
      message: message || config.messages.file.size,
      test: (value: File, params: Params) => {
        return validateSize({
          bytes: value.size,
          reference: params.size
        })
      }
    })

    return this
  }
}

export default FileSchema
