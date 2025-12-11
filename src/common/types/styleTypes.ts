/**
 * !!! colocando aqui por enquanto, mas eh legal que venha da biblioteca de componentes
 */

export type VariantName = 'primary' | 'successOutline' | 'warning' | 'secondary' | 'secondaryDanger' | 'disabled'

export type GenericStatusTagProps = {
  text: string;
  variant: VariantName;
}

export type Variants = {
  primary: string;
  successOutline: string;
  warning: string;
  secondary: string;
  secondaryDanger: string;
  disabled: string;
}

export type IconVariant = 'outlined' | 'rounded' | 'sharp'
