<template>
  <div class="checklist">
    <span v-for="(option, index) in fieldProps.options" :key="index">
      <input
        :id="`${fieldProps.name}-${option.value}`"
        type="checkbox"
        :name="fieldProps.name"
        :value="option.value"
        :disabled="option.disabled || formData.isLoading"
        :checked="formData.fields[fieldProps.name].includes(option.value)"
        @change="onChange($event)"
      />

      <label v-if="option.text" :for="`${fieldProps.name}-${option.value}`">
        {{ option.text }}
      </label>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import FormData from '@/models/FormData'
import FieldProps from '@/models/FieldProps'
import { Event } from '@cataline.io/mask'
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
    onChange(event: Event) {
      let items = this.formData.fields[this.fieldProps.name]

      if (event.target.checked) {
        items = [...items, event.target.value]
      } else {
        items = items.filter((item: string) => item !== event.target.value)
      }

      this.formData.fields[this.fieldProps.name] = items
    }
  }
})
</script>
