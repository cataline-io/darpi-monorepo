import { Event } from '@/models'
import typeOf from './TypeOf'

const deletePreviousSpecialKeys = (event: Event) => {
  let value = event.target.value
  let done = false

  while (!done) {
    const lastKey = value.slice(-1)

    if (typeOf.key.input(lastKey) === 'special') {
      // remove last key
      value = value.slice(0, -1)
    } else {
      done = true
    }
  }

  return value
}

export default deletePreviousSpecialKeys
