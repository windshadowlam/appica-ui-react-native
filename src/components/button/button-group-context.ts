import * as React from 'react'

export interface ButtonGroupContextValue {
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
}

export type ButtonVariant =
  | 'primary'
  | 'primary-outline'
  | 'secondary'
  | 'soft'
  | 'outline'
  | 'ghost'
  | 'destructive'
  | 'light'

export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon-sm' | 'icon-md' | 'icon-lg'

export const ButtonGroupContext = React.createContext<ButtonGroupContextValue | null>(null)
