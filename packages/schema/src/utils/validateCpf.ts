const validateCpf = (cpf: string) => {
  if (!cpf) return false

  const replacedCpf = cpf.replace(/\D/g, '')
  const valuesToReject = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999'
  ]

  if (valuesToReject.includes(replacedCpf)) return false

  let sum, rest

  sum = 0

  for (let i = 1; i <= 9; i++) {
    sum = sum + parseInt(replacedCpf.substring(i - 1, i)) * (11 - i)
  }

  rest = (sum * 10) % 11

  if (rest === 10 || rest === 11) rest = 0

  if (rest !== parseInt(replacedCpf.substring(9, 10))) return false

  sum = 0

  for (let i = 1; i <= 10; i++) {
    sum = sum + parseInt(replacedCpf.substring(i - 1, i)) * (12 - i)
  }

  rest = (sum * 10) % 11

  if (rest === 10 || rest === 11) rest = 0

  if (rest !== parseInt(replacedCpf.substring(10, 11))) {
    return false
  }

  return true
}

export default validateCpf
