import * as React from 'react'
import { View, Pressable, Text, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'
import { useControllableState } from '../../hooks/use-controllable-state'

export interface RatingProps {
  value?: number
  defaultValue?: number
  onValueChange?: (value: number) => void
  max?: number
  /** Allow half-star selection. @default false */
  allowHalf?: boolean
  readonly?: boolean
  size?: number
  color?: string
  style?: StyleProp<AnyStyle>
}

function Rating({ value, defaultValue = 0, onValueChange, max = 5, allowHalf = false, readonly, size = 24, color, style }: RatingProps) {
  const theme = useTheme()
  const [val, setVal] = useControllableState<number>({ value, defaultValue, onChange: onValueChange })
  const starColor = color ?? theme.colors.warning

  return (
    <View style={cn({ flexDirection: 'row', gap: 2 }, style)}>
      {Array.from({ length: max }).map((_, i) => {
        const idx = i + 1
        const filled = val >= idx
        const half = allowHalf && !filled && val >= idx - 0.5
        return (
          <Pressable
            key={i}
            accessibilityRole="button"
            disabled={readonly}
            onPress={() => !readonly && setVal(idx)}
            style={{ padding: 2 }}
          >
            <Text style={{ fontSize: size, color: filled || half ? starColor : theme.colors['border-intense'] }}>
              {filled ? '★' : half ? '⯨' : '☆'}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}

export { Rating }
