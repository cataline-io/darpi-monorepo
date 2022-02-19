<template>
  <div
    :class="[
      'input',
      { 'with-prefix': fieldProps.prefix },
      { 'with-suffix': fieldProps.suffix },
      { 'with-prepend': hasPrepend },
      { 'with-append': hasAppend }
    ]"
  >
    <div class="prefix" v-if="fieldProps.prefix">
      {{ fieldProps.prefix }}
    </div>

    <div v-if="hasPrepend" class="prepend">
      <slot name="prepend" />
    </div>

    <input
      :id="fieldProps.name"
      :name="fieldProps.name"
      :type="fieldProps.type"
      :value="formData.fields[fieldProps.name]"
      :placeholder="fieldProps.placeholder"
      :disabled="fieldProps.disabled || formData.isLoading"
      :mask="fieldProps.mask"
      @input="onChange($event)"
    />

    <div v-if="hasAppend" class="append">
      <slot name="append" />
    </div>

    <div class="suffix" v-if="fieldProps.suffix">
      {{ fieldProps.suffix }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import FormData from '@/models/FormData'
import FieldProps from '@/models/FieldProps'
import mask, { Event } from '@cataline.io/mask'
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
  computed: {
    hasAppend() {
      return Object.keys(this.$slots).includes('append')
    },
    hasPrepend() {
      return Object.keys(this.$slots).includes('prepend')
    }
  },
  methods: {
    onChange(event: Event) {
      if (this.fieldProps.mask) {
        // the value returned from handler
        // cannot be directly signed to fields[name] property
        // like: this.formData.fields[this.fieldProps.name] = mask.handler(event)
        // because the on-screen change occurs
        // before the value is modified in the fields object

        // so first event value must be modified natively
        event.target.value = mask.handler(event)

        // and then sent to the reactive properties of the form data
        this.formData.fields[this.fieldProps.name] = event.target.value
        return
      }

      this.formData.fields[this.fieldProps.name] = valueTransformer({
        schema: this.formSchema,
        fieldName: this.fieldProps.name,
        fieldValue: event.target.value
      })
    }
  }
})
</script>
