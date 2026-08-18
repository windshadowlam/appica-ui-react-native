import * as React from 'react'
import { Pressable, View, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'

export interface ColorSwatchProps {
  color: string
  selected?: boolean
  onSelect?: () => void
  size?: number
  disabled?: boolean
  style?: StyleProp<AnyStyle>
}

/** A single selectable color chip. Mirrors Appica's `color-swatch`. */
function ColorSwatch({ color, selected, onSelect, size = 28, disabled, style }: ColorSwatchProps) {
  const theme = useTheme()
  return (
    <Pressable
      disabled={disabled}
      onPress={onSelect}
      accessibilityRole="button"
      style={({ pressed }) =>
        cn(
          {
            width: size,
            height: size,
            borderRadius: 8,
            borderWidth: 2,
            borderColor: selected ? theme.colors.foreground : theme.colors['border-muted'],
            backgroundColor: color,
            opacity: disabled ? 0.4 : pressed ? 0.8 : 1,
          },
          style,
        )
      }
    >
      {selected ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: size * 0.32, height: size * 0.18, borderRightWidth: 2, borderBottomWidth: 2, borderColor: '#fff', transform: [{ rotate: '45deg' }] }} />
        </View>
      ) : null}
    </Pressable>
  )
}

export { ColorSwatch }
