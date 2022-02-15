import MixedSchema from '@/rules/mixed'

export type InferType<T> = {
  [P in keyof T]: T[P] extends MixedSchema<infer TS> ? TS : never
}

export interface Error {
  validation: string
  field: string
  message: string
}

export interface Messages {
  mixed: {
    required: string
    confirmed: string
    oneOf: string
    equal: string
  }
  string: {
    isString: string
    email: string
    url: string
    length: string
    minLength: string
    maxLength: string
    minWords: string
    maxWords: string
    first: string
    last: string
    onlyNumbers: string
    notOnlyNumbers: string
    cpf: string
  }
  number: {
    isNumber: string
    length: string
    min: string
    max: string
    positive: string
    negative: string
    between: string
  }
  boolean: {
    isBoolean: string
  },
  array: {
    isArray: string,
    minLength: string
    maxLength: string
  }
  file: {
    isFile: string
    extnames: string
    size: string
  }
}

export interface Validation {
  name: string
  message: string
  params?: Record<string, any>
  test: (value: any, params?: any) => boolean
}

export interface Formatting {
  name: string
  params?: Record<string, any>
  format: (value: any, params?: any) => any
}

export interface Schema {
  [key: string]: {
    validations: Validation[]
    formattings: Formatting[]
  }
}

export type Language = 'en' | 'ptBR'

export interface Config {
  language: Language
  messages: Messages
}

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

export interface NewConfig extends Partial<Omit<Config, 'messages'>> {
  messages?: DeepPartial<Config['messages']>
}
