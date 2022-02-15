import mitt from 'mitt'

type Events = {
  addField: {
    name: string
    value: unknown
  }
}

const eventBus = mitt<Events>()

export default eventBus
