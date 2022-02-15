<template>
  <Form :schema="fields" @submit="send">
     <Field
      label="Vip Client"
      name="isVip"
      type="switch"
      :value="false"
      text="You are vip???"
    />

    <Field name="email" label="Email" value="yung@cataline.io"  />

    <Field label="Password" name="password" type="password" />

    <Field label="Description" name="description" type="textarea" />

    <Field label="URL" name="url" prefix="https://" suffix=".com" />

    <Field label="Search" name="search">
      <template v-slot:prepend>
        <span>pp</span>
      </template>

      <template v-slot:append>
        <span>ap</span>
      </template>
    </Field>

    <Field
      label="Delivery"
      name="delivery"
      type="radio"
      :options="[
        { text: 'Normal', value: 'normal' },
        { text: 'Fast', value: 'fast'}
      ]"
    /> 

    <Field
      label="City"
      name="city"
      type="select"
      placeholder="Select a City"
      :options="[
        { text: 'Recife', value: 'recife', disabled: true },
        { text: 'São Paulo', value: 'são paulo' },
        { text: 'Rio de Janeiro', value: 'rio de janeiro' }
      ]"
    />

     <Field label="Terms" name="terms" type="checkbox" text="I'am agree"  />

    <div class="buttons">
      <Button text="default" color="default" />
      <Button text="primary" color="primary" />
      <Button text="success" color="success" />
      <Button text="danger" color="danger" />
      <Button text="warning" color="warning" />
    </div>
  </Form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Form, Field, Button, schema } from '@/entry.esm'
import { FormContext } from '@/models'

const fields = schema.typed({
  isVip: schema.boolean().required(),
  email: schema.string().required().email(),
  password: schema.string().required().minLength(4),
  description: schema.string(),
  url: schema.string().required(),
  search: schema.string().required(),
  delivery: schema.string().required().oneOf(['normal', 'fast']),
  city: schema.string().required().oneOf(['recife', 'são paulo']),
  terms: schema.boolean().required().equal(true)
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

<style scoped>
.buttons {
  display: grid;
  grid-auto-flow: column;
  grid-gap: 0.75rem;
}
</style>
