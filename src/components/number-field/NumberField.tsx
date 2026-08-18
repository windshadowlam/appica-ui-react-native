import * as React from 'react'
import { View, TextInput, Pressable, Text, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'
import { useControllableState } from '../../hooks/use-controllable-state'

export interface NumberFieldProps {
  value?: number
  defaultValue?: number
  onValueChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  style?: StyleProp<AnyStyle>
}

const SIZE = {
  sm: { h: 32, r: 8, fs: 12, btn: 28 },
  md: { h: 40, r: 10, fs: 14, btn: 34 },
  lg: { h: 48, r: 12, fs: 16, btn: 42 },
}

function NumberField({ value, defaultValue = 0, onValueChange, min, max, step = 1, disabled, size = 'md', style }: NumberFieldProps) {
  const theme = useTheme()
  const [val, setVal] = useControllableState<number>({ value, defaultValue, onChange: onValueChange })
  const d = SIZE[size]

  const clamp = (n: number) => {
    let next = n
    if (min != null) next = Math.max(min, next)
    if (max != null) next = Math.min(max, next)
    return next
  }
  const bump = (dir: 1 | -1) => setVal(clamp(val + dir * step))

  const stepper: AnyStyle = {
    width: d.btn,
    height: d.btn,
    borderRadius: d.r - 2,
    borderWidth: 1,
    borderColor: theme.colors['border-strong'],
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
    opacity: disabled ? 0.5 : 1,
  }

  return (
    <View
      style={cn(
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          height: d.h,
          paddingHorizontal: 8,
          borderRadius: d.r,
          borderWidth: 1,
          borderColor: theme.colors['border-strong'],
          backgroundColor: theme.colors.background,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      )}
    >
      <Pressable disabled={disabled} onPress={() => bump(-1)} style={stepper}>
        <Text style={{ color: theme.colors['foreground-emphasis'], fontSize: d.fs + 2, fontWeight: '600' }}>−</Text>
      </Pressable>
      <TextInput
        editable={!disabled}
        keyboardType="numeric"
        value={String(val)}
        onChangeText={(t) => {
          const n = parseFloat(t)
          if (!Number.isNaN(n)) setVal(clamp(n))
        }}
        style={{ flex: 1, textAlign: 'center', color: theme.colors.foreground, fontSize: d.fs }}
      />
      <Pressable disabled={disabled} onPress={() => bump(1)} style={stepper}>
        <Text style={{ color: theme.colors['foreground-emphasis'], fontSize: d.fs + 2, fontWeight: '600' }}>+</Text>
      </Pressable>
    </View>
  )
}

export { NumberField }
