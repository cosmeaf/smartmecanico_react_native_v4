export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/
  if (!email) return "Campo E-mail não pode ser vázio"
  if (!re.test(email)) return 'Informe um e-mail Válido'
  return ''
}
