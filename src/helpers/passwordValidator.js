export function passwordValidator(password) {
  if (!password) {
    return "Campo Senha não pode ser vázio"
  }
  if (password.length < 8) {
    return "Senha deve ter no minimo 8 Caracteres"
  }
  return ''
}