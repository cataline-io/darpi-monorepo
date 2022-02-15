<template>
  <div
    :class="[
      'select',
      { 'is-open': isOpen },
      { 'is-disabled': fieldProps.disabled }
    ]"
  >
    <div class="selected" ref="selected" @click="toggleOptions">
      {{ defaultText }}
    </div>

    <i class="darpi-arrow"></i>

    <div class="options" ref="options">
      <div
        v-for="(option, index) in fieldProps.options"
        :key="index"
        :class="[
          'item',
          { 'is-selected': option.selected },
          { 'is-disabled': option.disabled }
        ]"
        @click="onChange(index)"
      >
        {{ option.text }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { FormData, FieldProps } from '@/models'
import { Schema } from '@cataline.io/schema'
import valueTransformer from '@/utils/valueTransformer'

type Refs = 'options' | 'selected'

export default defineComponent({
  data() {
    return {
      formData: inject('formData') as FormData,
      formSchema: inject('formSchema') as Schema,
      fieldProps: { ...inject('fieldProps') } as FieldProps,
      isOpen: false
    }
  },
  computed: {
    defaultText(): string {
      const selected = this.fieldProps.options.find(({ selected }) => selected)

      if (selected) {
        return selected.text
      }

      return this.fieldProps.placeholder || ''
    }
  },
  mounted() {
    document.addEventListener('click', this.closeOnClickOutside)
    document.addEventListener('keydown', this.closeOnPressEscape)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeOnClickOutside)
    document.removeEventListener('keydown', this.closeOnPressEscape)
  },
  methods: {
    closeOnClickOutside(event: MouseEvent) {
      const targetEl = event.target as HTMLElement
      const isItem = targetEl.classList.contains('item')

      if (!isItem && this.isOpen && targetEl !== this.el('selected')) {
        this.isOpen = false
      }
    },
    closeOnPressEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        this.isOpen = false
      }
    },
    el(ref: Refs) {
      return this.$refs[ref] as HTMLElement
    },
    toggleOptions() {
      if (this.fieldProps.disabled) return

      this.isOpen = !this.isOpen
    },
    onChange(optionIndex: number) {
      const optionClicked = this.fieldProps.options[optionIndex]

      if (optionClicked.disabled) return

      // set new item selected
      this.fieldProps.options = this.fieldProps.options.map((option, index) => {
        return { ...option, selected: index === optionIndex }
      })

      // put new value on formData
      this.formData.fields[this.fieldProps.name] = valueTransformer({
        schema: this.formSchema,
        fieldName: this.fieldProps.name,
        fieldValue: optionClicked.value
      })

      this.isOpen = false
    }
  }
})
</script>
