<template>
  <Form :schema="fields" @submit="send" v-slot="{ fields }">
    <Field
      name="drink"
      type="select"
      :options="[
        { text: 'selected a drink', disabled: true, chosen: true },
        ...drinkOptions(fields.drink)
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
  drink: schema.string().required().oneOf(['coffee', 'tea', 'coke'])
})

type Fields = typeof fields

export default defineComponent({
  name: 'selectExample',
  components: { Form, Field, Button },
  data() {
    return {
      fields,
      drinks: ['coffee', 'tea', 'coke'],
      values: {
        drink: 'tea'
      }
    }
  },
  methods: {
    drinkOptions(currentValue: string) {
      return this.drinks.map((drink) => ({
        text: drink.charAt(0).toUpperCase() + drink.slice(1),
        value: drink,
        chosen: currentValue === drink
      }))
    },
    send({ fields }: FormContext<Fields>) {
      console.log(fields)
    }
  }
})
</script>
