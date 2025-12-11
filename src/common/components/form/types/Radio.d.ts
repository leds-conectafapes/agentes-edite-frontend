export type RadioOrientation = 'horizontal' | 'vertical'

export type RadioProps = {
  orientation?: RadioOrientation;
  label?: string;
  options?: Array<{
    label: string;
    index: number | boolean;
    value: string | number | boolean
  }>;
  modelValue?: string | number | boolean | null
  useIndexAsValue?: boolean

}

export type RadioEmits = {
  (e: 'update:modelValue', modelValue: string | number | boolean): void
}
