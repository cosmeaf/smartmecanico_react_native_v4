export function passwordValidator(password) {
  if (!password) return "Campo Senha não pode ser vázio"
  if (password.length < 6) return 'Senha deve ter no minimo 6 Caracteres'
  return ''
}
