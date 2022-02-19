<template>
  <Form :schema="fields" :values="values" @submit="send" v-slot="{ fields }">
    <Field
      label="Terms"
      name="terms"
      type="checkbox"
      text="I'am agree"
      :value="false"
    />

    <Button text="send" />

    <h1>{{ fields }}</h1>
  </Form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Form, Field, Button, schema } from '@/entry.esm'
import FormContext from '@/models/FormContext'

const fields = schema.typed({
  terms: schema.boolean().required()
})

const values = {
  terms: true
}

type Fields = typeof fields

export default defineComponent({
  components: { Form, Field, Button },
  data() {
    return { fields, values }
  },
  methods: {
    send({ fields }: FormContext<Fields>) {
      console.log(fields)
    }
  }
})
</script>
