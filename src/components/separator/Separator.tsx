import * as React from 'react'
import { View, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'

export interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical'
  /** Thickness in px. @default 1 */
  thickness?: number
  style?: StyleProp<AnyStyle>
}

function Separator({ orientation = 'horizontal', thickness = 1, style }: SeparatorProps) {
  const theme = useTheme()
  const base: AnyStyle = {
    backgroundColor: theme.colors['border-muted'],
    ...(orientation === 'horizontal'
      ? { width: '100%' as unknown as number, height: thickness }
      : { width: thickness, height: '100%' as unknown as number }),
  }
  return <View style={cn(base, style)} />
}

export { Separator }
