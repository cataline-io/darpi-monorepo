<template>
  <form :class="['form', { 'is-loading': isLoading }]" @submit.prevent="submit">
    <slot v-bind="formContext" />
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { validate, Schema } from '@cataline.io/schema'
import { FormData, FormContext } from '@/models'
import eventBus from '@/utils/eventBus'

type Values = Record<string, any>

export default defineComponent({
  name: 'Form',
  emits: ['submit'],
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true
    },
    values: {
      type: Object as PropType<Values>,
      default: () => ({})
    }
  },
  data(): FormData {
    return {
      submitted: false,
      isValid: false,
      isLoading: false,
      rules: [],
      errors: [],
      fields: {},
      watchInPause: false
    }
  },
  computed: {
    formContext<T>(): FormContext<T> {
      return {
        fields: this.fields as any,
        errors: this.errors,
        submitted: this.submitted,
        isValid: this.isValid,
        isLoading: this.isLoading,
        resetForm: this.resetForm,
        addValue: this.addValue,
        addError: this.addError,
        removeErrors: this.removeErrors,
        enableLoading: this.enableLoading,
        disableLoading: this.disableLoading
      }
    }
  },
  provide() {
    return {
      formData: this.$data,
      formSchema: this.schema
    }
  },
  watch: {
    fields: {
      deep: true,
      async handler() {
        if (!this.submitted || this.watchInPause) return

        await this.makeValidate()
      }
    }
  },
  created() {
    this.setValues()

    eventBus.on('addField', ({ name, value }) => {
      this.fields[name] = value
    })
  },
  methods: {
    async submit() {
      this.submitted = true

      await this.makeValidate()

      if (this.errors.length > 0) return

      this.$emit('submit', this.formContext)
    },
    async makeValidate() {
      this.watchInPause = true

      const { errors, formattedValues } = validate(this.schema, this.fields)

      this.errors = errors
      this.fields = formattedValues

      const validations = this.rules.map(async (rule) => {
        // if the field already has previous errors
        // do not run custom validations
        if (this.errors.some(({ field }) => field === rule.field)) return

        const result = await rule.test(this.fields[rule.field])

        if (result === true) {
          return true
        } else {
          this.errors.push({
            field: rule.field,
            validation: rule.name,
            message: result
          })
        }
      })

      await Promise.all(validations)

      this.isValid = errors.length <= 0

      this.$nextTick(() => {
        this.watchInPause = false
      })
    },
    setValues() {
      Object.keys(this.schema).forEach((key) => {
        if (this.values[key] === undefined) {
          this.fields[key] = null
        } else {
          this.fields[key] = this.values[key]
        }
      })
    },
    resetForm(newValues?: Values) {
      Object.keys(this.fields).forEach((field) => {
        this.fields[field] = newValues?.[field] ? newValues[field] : null
      })

      this.submitted = false
      this.isValid = false
    },
    addValue(fields: Values) {
      Object.keys(fields).forEach((fieldName) => {
        this.fields[fieldName] = fields[fieldName]
      })
    },
    addError(fields: Values) {
      Object.keys(fields).forEach((fieldName) => {
        this.errors.push({
          validation: 'unknown',
          field: fieldName,
          message: fields[fieldName]
        })
      })
    },
    removeErrors(fieldList?: any[]) {
      if (fieldList && fieldList.length > 0) {
        this.errors = this.errors.filter(({ field }) => {
          return !fieldList.includes(field)
        })
      } else {
        this.errors = []
      }
    },
    enableLoading() {
      this.isLoading = true
    },
    disableLoading() {
      this.isLoading = false
    }
  }
})
</script>
