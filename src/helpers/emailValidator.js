export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/
  if (!email) return "Campo E-mail não pode ser vázio"
  if (!re.test(email)) return 'Ooops! Você necessita enviar um E-mail válido'
  return ''
}
