import { Config, NewConfig } from '@/models'
import allMessages from '@/messages/all'
import mergeDeep from '@/utils/mergeDeep'

export let config: Config = {
  language: 'en',
  messages: allMessages.en
}

const configure = (newConfig: NewConfig) => {
  if (newConfig.language && newConfig.language !== config.language) {
    config.messages = allMessages[newConfig.language]
  }

  config = mergeDeep(config, newConfig) as Config
}

export default configure
