export type SnackbarVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger'

export const SnackbarStyles: Record<SnackbarVariant, { color: string, fontColor: string }> = {
  primary: { color: '#2b3a8a', fontColor: '#ffffff' }, // Azul
  secondary: { color: '#b6b9cc', fontColor: '#ffffff' }, // Cinza
  success: { color: '#30934c', fontColor: '#ffffff' }, // Verde
  warning: { color: '#fdc32e', fontColor: '#ffffff' }, // Amarelo
  danger: { color: '#ae1212', fontColor: '#ffffff' }, // Vermelho
}
