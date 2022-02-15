<template>
  <div :class="['field', { 'has-error': this.firstError }]">
    <div v-if="label" class="label">
      {{ label }}
    </div>

    <Input v-if="isInput" v-bind="$attrs">
      <template v-for="slot in Object.keys($slots)" v-slot:[slot]="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
    </Input>

    <Textarea v-if="isTextArea" />
    <Select v-if="isSelect" />
    <Radio v-if="isRadio" />
    <Checkbox v-if="isCheckBox" />
    <Checklist v-if="isCheckList" />
    <Switch v-if="isSwitch" />
    <File v-if="isFile" />

    <div v-if="autoMessages === 'on'" class="error-message" v-show="firstError">
      {{ firstError }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, PropType } from 'vue'
import { FormData, Rule, Option } from '@/models'
import eventBus from '@/utils/eventBus'
import { validateFieldType, FieldType } from '@/utils/validateFieldType'
import mask from '@cataline.io/mask'
import { Schema } from '@cataline.io/schema'

// components
import Input from '@/components/fields-cases/Input.vue'
import Textarea from '@/components/fields-cases/Textarea.vue'
import Radio from '@/components/fields-cases/Radio.vue'
import Select from '@/components/fields-cases/Select.vue'
import Checkbox from '@/components/fields-cases/Checkbox.vue'
import Checklist from '@/components/fields-cases/Checklist.vue'
import Switch from '@/components/fields-cases/Switch.vue'
import File from '@/components/fields-cases/File.vue'

export default defineComponent({
  name: 'Field',
  components: {
    Input,
    Textarea,
    Radio,
    Select,
    Checkbox,
    Checklist,
    Switch,
    File
  },
  props: {
    name: { type: String, required: true },
    placeholder: { type: String, default: null },
    readonly: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    value: { type: [String, Number, Boolean], default: null },
    label: { type: String, default: null },
    text: { type: String, default: null },
    rows: { type: Number, default: 5 },
    cols: { type: Number, default: 33 },
    mask: { type: String, default: null },
    autoMessages: { type: String, default: 'on' },
    options: { type: Array as PropType<Option[]>, default: () => [] },
    rules: { type: Array as PropType<Rule['test'][]>, default: () => [] },
    type: {
      type: String as PropType<FieldType>,
      default: 'text',
      validator: (value: FieldType) => validateFieldType(value)
    },
    prefix: {
      type: String,
      default: null
    },
    suffix: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      formData: inject('formData') as FormData,
      formSchema: inject('formSchema') as Schema
    }
  },
  computed: {
    isInput() {
      return ['text', 'number', 'email', 'password'].includes(this.type)
    },
    isTextArea() {
      return this.type === 'textarea'
    },
    isRadio() {
      return this.type === 'radio'
    },
    isSelect() {
      return this.type === 'select'
    },
    isFile() {
      return this.type === 'file'
    },
    isCheckBox() {
      return this.type === 'checkbox'
    },
    isCheckList() {
      return this.type === 'checklist'
    },
    isSwitch() {
      return this.type === 'switch'
    },
    firstError(): string | undefined {
      const firstError = this.formData.errors.find(({ field }) => {
        return field === this.name
      })

      return firstError?.message
    }
  },
  provide() {
    return {
      fieldProps: this.$props
    }
  },
  created() {
    this.addField()
    this.addRules()

    if (this.isSelect || this.isRadio) {
      this.setChosenValue()
    }
  },
  methods: {
    addField() {
      let value: any = null

      // <Form values=""/>
      if (this.formData.fields[this.name] !== undefined) {
        value = this.formData.fields[this.name]
      }

      //  <Field value=""/> !important
      if (this.value !== null) {
        value = this.value
      }

      // <Field mask=""/>
      if (value && this.mask) {
        value = mask.format(value.toString(), this.mask)
      }

      eventBus.emit('addField', { name: this.name, value })
    },
    addRules() {
      this.rules.map((ruleMethod) => {
        this.formData.rules.push({
          name: ruleMethod.name.split(' ').pop() || 'unknown',
          field: this.name,
          test: ruleMethod
        })
      })
    },
    setChosenValue() {
      const defaultOption = this.options.find(({ chosen, value }) => {
        return chosen && value !== undefined
      })

      if (!defaultOption) return

      this.formData.fields[this.name] = defaultOption.value
    }
  }
})
</script>
