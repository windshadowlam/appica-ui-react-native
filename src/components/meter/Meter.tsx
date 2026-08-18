import * as React from 'react'
import { View, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'
import { type ProgressColor } from '../progress/Progress'

export interface MeterProps {
  /** Current value. */
  value?: number
  /** Maximum value. @default 100 */
  max?: number
  /** Number of discrete segments. @default 12 */
  segments?: number
  color?: ProgressColor
  style?: StyleProp<AnyStyle>
}

/**
 * Discrete meter — fills whole segments rather than a continuous bar.
 * Mirrors Appica's `meter` (used for signal strength, capacity, etc.).
 */
function Meter({ value = 0, max = 100, segments = 12, color = 'primary', style }: MeterProps) {
  const theme = useTheme()
  const filled = Math.round((Math.max(0, Math.min(max, value)) / max) * segments)
  const fillColor = theme.colors[color]
  const gap = 3
  return (
    <View style={cn({ flexDirection: 'row', gap, height: 8 }, style)}>
      {Array.from({ length: segments }).map((_, i) => (
        <View
          key={i}
          style={{
            flex: 1,
            borderRadius: 2,
            backgroundColor: i < filled ? fillColor : theme.colors['background-strong'],
          }}
        />
      ))}
    </View>
  )
}

export { Meter }
