<template>
  <Form :schema="fields" :values="values" @submit="send" v-slot="{ fields }">
    <Field
      label="Skills"
      name="skills"
      type="checklist"
      :options="[
        { text: 'HTML', value: 'html' },
        { text: 'CSS', value: 'css' },
        { text: 'Javascript', value: 'javascript' },
        { text: 'VueJS', value: 'vue.js' }
      ]"
    />

    <Button text="send" />

    <h1>{{ fields }}</h1>
  </Form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Form, Field, Button, schema } from '@/entry.esm'
import { FormContext } from '@/models'

const fields = schema.typed({
  skills: schema.array().required().minLength(1)
})

const values = {
  skills: ['html']
}

type Fields = typeof fields

export default defineComponent({
  components: { Form, Field, Button },
  data() {
    return {
      fields,
      values
    }
  },
  methods: {
    send({ fields }: FormContext<Fields>) {
      console.log(fields)
    }
  }
})
</script>
