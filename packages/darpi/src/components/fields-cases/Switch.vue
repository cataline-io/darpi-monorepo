<template>
  <div class="switch">
    <input
      :id="fieldProps.name"
      type="checkbox"
      class="switch"
      :name="fieldProps.name"
      :disabled="fieldProps.disabled || formData.isLoading"
      :checked="formData.fields[fieldProps.name]"
      @change="onChange($event)"
    />
    <label v-if="fieldProps.text" :for="fieldProps.name">
      {{ fieldProps.text }}
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { FormData, FieldProps } from '@/models'
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
      this.formData.fields[this.fieldProps.name] = event.target.checked
    }
  }
})
</script>
