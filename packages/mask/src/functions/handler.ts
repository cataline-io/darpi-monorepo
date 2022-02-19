import format from '@/functions/format'
import { Event } from '@/models'
import createState from '@/utils/createState'
import preventTyping from '@/utils/preventTyping'
import injectSpecialKeys from '@/utils/injectSpecialKeys'
import deletePreviousSpecialKeys from '@/utils/deletePreviousSpecialKeys'

const handler = (event: Event) => {
  const state = createState(event)

  if (['insertFromPaste', undefined].includes(event.inputType)) {
    return format(state.input.value, state.mask.pattern)
  }

  if (['deleteByCut', 'deleteContentBackward'].includes(event.inputType)) {
    if (!state.input.isEmpty) {
      return deletePreviousSpecialKeys(event)
    }

    return event.target.value
  }

  console.log(state.input.value)
  if (state.input.value.length > state.mask.pattern.length) {
    return preventTyping(event)
  }

  if (state.input.key.type === 'special') {
    return preventTyping(event)
  }

  if (state.mask.key.type === 'special') {
    if (state.input.key.type !== state.mask.next.alphanumericKey.type) {
      return preventTyping(event)
    } else {
      return injectSpecialKeys(event)
    }
  }

  if (state.input.key.type !== state.mask.key.type) {
    if (state.mask.key.type !== 'alphanumeric') {
      return preventTyping(event)
    }
  }

  return state.input.value
}

export default handler
