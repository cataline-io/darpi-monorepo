<template>
  <div class="file">
    <label :for="fieldProps.name">
      <span class="browse">Browse File</span>
      <span class="content">{{ filename }}</span>
    </label>

    <input
      :id="fieldProps.name"
      :name="fieldProps.name"
      type="file"
      @input="onChange($event)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import FormData from '@/models/FormData'
import FieldProps from '@/models/FieldProps'

export default defineComponent({
  data() {
    return {
      formData: inject('formData') as FormData,
      fieldProps: inject('fieldProps') as FieldProps
    }
  },
  computed: {
    filename(): string {
      const field = this.formData.fields[this.fieldProps.name]

      return field?.name ? field.name : ''
    }
  },
  methods: {
    onChange(event: any) {
      this.formData.fields[this.fieldProps.name] = event.target.files[0]
    }
  }
})
</script>
