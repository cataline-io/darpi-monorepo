<template>
  <Form :schema="fields" @submit="send">
    <Field
      label="Are you a robot?"
      name="isRobot"
      type="radio"
      :options="[
        { text: 'Yes', value: true },
        { text: 'No', value: false, chosen: true }
      ]"
    />

    <Button text="send" />
  </Form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Form, Field, Button, schema } from '@/entry.esm'
import FormContext from '@/models/FormContext'

const fields = schema.typed({
  isRobot: schema.boolean().required()
})

type Fields = typeof fields

export default defineComponent({
  components: { Form, Field, Button },
  data() {
    return { fields }
  },
  methods: {
    send({ fields }: FormContext<Fields>) {
      console.log(fields)
    }
  }
})
</script>
