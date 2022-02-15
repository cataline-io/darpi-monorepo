<template>
  <div class="radio">
    <span v-for="(option, index) in fieldProps.options" :key="index">
      <input
        :id="uniqueId(option.value)"
        type="radio"
        :name="fieldProps.name"
        :disabled="formData.isLoading ? true : option.disabled"
        :checked="
          option.chosen || formData.fields[fieldProps.name] === option.value
        "
        :value="option.value"
        @change="onChange($event)"
      />

      <label :for="uniqueId(option.value)">
        {{ option.text }}
      </label>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { FormData, FieldProps } from '@/models'
import { Event } from '@cataline.io/mask'
import valueTransformer from '@/utils/valueTransformer'
import { Schema } from '@cataline.io/schema'

export default defineComponent({
  data() {
    return {
      formData: inject('formData') as FormData,
      formSchema: inject('formSchema') as Schema,
      fieldProps: inject('fieldProps') as FieldProps
    }
  },
  methods: {
    uniqueId(value: any) {
      return `${this.fieldProps.name}-${value}`
    },
    onChange(event: Event) {
      this.formData.fields[this.fieldProps.name] = valueTransformer({
        schema: this.formSchema,
        fieldName: this.fieldProps.name,
        fieldValue: event.target.value
      })
    }
  }
})
</script>
