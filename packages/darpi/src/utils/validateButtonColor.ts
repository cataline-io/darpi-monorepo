const colors = ['default', 'primary', 'success', 'danger', 'warning'] as const

type Color = typeof colors[number]

const validateButtonColor = (value: Color) => {
  return colors.includes(value)
}

export { validateButtonColor, Color }
