<template>
  <button :class="['button', color]" :disabled="disabled || formData.isLoading">
    <span v-if="text" class="text">
      {{ text }}
    </span>

    <slot v-else class="content" />
  </button>
</template>

<script lang="ts">
import { defineComponent, inject, PropType } from 'vue'
import { FormData } from '@/models'
import { validateButtonColor, Color } from '@/utils/validateButtonColor'

export default defineComponent({
  name: 'Button',
  props: {
    text: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String as PropType<Color>,
      default: 'default',
      validator: (v: Color) => validateButtonColor(v)
    }
  },
  data() {
    return {
      formData: inject('formData') as FormData
    }
  }
})
</script>
