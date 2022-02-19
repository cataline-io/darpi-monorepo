<template>
  <Form :schema="fields" @submit="send" v-slot="{ fields }">
    <Field label="Avatar" name="avatar" type="file" />

    <Button text="send" />

    <h1>{{ fields }}</h1>
  </Form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Form, Field, Button, schema } from '@/entry.esm'
import FormContext from '@/models/FormContext'

const fields = schema.typed({
  avatar: schema
    .file()
    .required()
    .extnames(['png', 'svg', 'jpg', 'jpeg'])
    .size('2mb')
})

type Fields = typeof fields

export default defineComponent({
  components: { Form, Field, Button },
  data() {
    return { fields }
  },
  methods: {
    send({ resetForm }: FormContext<Fields>) {
      resetForm({
        avatar: undefined
      })
    }
  }
})
</script>
