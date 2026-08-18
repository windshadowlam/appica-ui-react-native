import * as React from 'react'
import { ActivityIndicator, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | number
  color?: string
  style?: StyleProp<AnyStyle>
}

function Spinner({ size = 'md', color, style }: SpinnerProps) {
  const theme = useTheme()
  const px = size === 'sm' ? 16 : size === 'lg' ? 32 : size === 'md' ? 24 : size
  return (
    <ActivityIndicator
      style={cn(style)}
      size={typeof px === 'number' && (px > 28 || px < 20) ? 'small' : 'small'}
      color={color ?? theme.colors.primary}
    />
  )
}

/** `Loader` is a named alias of `Spinner`, matching Appica's export surface. */
export const Loader = Spinner
export type LoaderProps = SpinnerProps

export { Spinner }
