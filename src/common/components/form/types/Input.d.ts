export type InputType = 'text' | 'search' | 'number' | 'email' | 'password' | 'tel' | 'url' | 'date'

export type InputState = 'default' | 'error' | 'warning' | 'disabled'

export type InputProps = {
  type?: InputType
  placeholder?: string
  caption?: string
  state?: InputState
  label: string
  required?: boolean
  errorMessages?: string[]
  modelValue?: string | null
}

export type InputEmits = {
  (e: 'update:modelValue', modelValue: string): void
}
