const interpolate = (rawMessage: string, data: Record<string, any> = {}) => {
  return rawMessage.replace(/\{(\w+)\}/g, (_match, expr) => {
    return data[expr]
  })
}

export default interpolate
