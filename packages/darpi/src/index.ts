import { defineComponent } from 'vue'
import { schema, configure } from '@cataline.io/schema'
import FormContext from '@/models/FormContext'

let Form: typeof defineComponent
let Field: typeof defineComponent
let Button: typeof defineComponent

export { Form, Field, Button, schema, configure, FormContext }
