import { Event } from '@/models'

const preventTyping = (event: Event) => {
  return event.target.value.slice(0, -1)
}

export default preventTyping
