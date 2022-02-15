<template>
  <div class="textarea">
    <textarea
      :id="fieldProps.name"
      :name="fieldProps.name"
      :rows="fieldProps.rows"
      :cols="fieldProps.cols"
      :value="formData.fields[fieldProps.name]"
      :placeholder="fieldProps.placeholder"
      @input="onChange($event)"
    />
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
      this.formData.fields[this.fieldProps.name] = event.target.value
    }
  }
})
</script>
