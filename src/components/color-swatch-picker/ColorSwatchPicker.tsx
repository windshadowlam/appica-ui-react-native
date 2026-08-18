import * as React from 'react'
import { View, type StyleProp } from 'react-native'
import { ColorSwatch } from '../color-swatch/ColorSwatch'
import { cn, type AnyStyle } from '../../utils/cn'

export interface ColorSwatchPickerProps {
  colors: string[]
  value?: string
  defaultValue?: string
  onValueChange?: (color: string) => void
  size?: number
  style?: StyleProp<AnyStyle>
}

/** Group of `ColorSwatch` with single selection. Mirrors Appica's `color-swatch-picker`. */
function ColorSwatchPicker({ colors, value, defaultValue, onValueChange, size = 28, style }: ColorSwatchPickerProps) {
  const [internal, setInternal] = React.useState(defaultValue)
  const current = value !== undefined ? value : internal
  return (
    <View style={cn({ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }, style)}>
      {colors.map((c) => (
        <ColorSwatch
          key={c}
          color={c}
          size={size}
          selected={current === c}
          onSelect={() => {
            if (value === undefined) setInternal(c)
            onValueChange?.(c)
          }}
        />
      ))}
    </View>
  )
}

export { ColorSwatchPicker }
