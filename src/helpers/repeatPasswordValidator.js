export function repeatPasswordValidator(repeatPassword) {
  if (!repeatPassword) {
    return "Campo Repetir Senha não pode ser vázio"
  }
  if (repeatPassword.length < 8) {
    return "Senha deve ter no minimo 8 Caracteres"
  }
  return ''
}