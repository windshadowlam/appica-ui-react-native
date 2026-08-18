import * as React from 'react'
import { View, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'

export interface BackgroundPatternProps {
  /** Pattern kind. @default 'dots' */
  variant?: 'dots' | 'grid'
  /** Spacing between repeats (px). @default 20 */
  spacing?: number
  /** Dot/square size (px). @default 2 */
  size?: number
  color?: string
  style?: StyleProp<AnyStyle>
  children?: React.ReactNode
}

/** Decorative repeating backdrop (dots or grid). Mirrors Appica's `background-pattern`. */
function BackgroundPattern({ variant = 'dots', spacing = 20, size = 2, color, style, children }: BackgroundPatternProps) {
  const theme = useTheme()
  const dot = color ?? theme.colors['border-intense']
  const [dims, setDims] = React.useState({ w: 0, h: 0 })

  const cols = Math.ceil((dims.w || 1) / spacing)
  const rows = Math.ceil((dims.h || 1) / spacing)
  const cells: React.ReactNode[] = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells.push(
        <View
          key={`${r}-${c}`}
          style={{
            position: 'absolute',
            left: c * spacing + spacing / 2,
            top: r * spacing + spacing / 2,
            width: variant === 'grid' ? spacing : size,
            height: variant === 'grid' ? 1 : size,
            borderRadius: variant === 'dots' ? size : 0,
            backgroundColor: dot,
            opacity: 0.5,
          }}
        />,
      )
    }
  }

  return (
    <View
      onLayout={(e) => setDims({ w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height })}
      style={cn({ position: 'relative', overflow: 'hidden' }, style)}
    >
      {cells}
      {children}
    </View>
  )
}

export { BackgroundPattern }
