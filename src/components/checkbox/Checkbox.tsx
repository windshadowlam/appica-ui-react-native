import * as React from 'react'
import { Pressable, View, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'
import { useControllableState } from '../../hooks/use-controllable-state'

export interface CheckboxProps {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  size?: number
  style?: StyleProp<AnyStyle>
}

function Check({ size, color }: { size: number; color: string }) {
  // CSS-style checkmark: a small box showing only its bottom + right borders.
  const s = size * 0.5
  return (
    <View
      style={{
        width: s,
        height: s * 0.92,
        borderRightWidth: Math.max(2, size * 0.13),
        borderBottomWidth: Math.max(2, size * 0.13),
        borderColor: color,
        transform: [{ rotate: '45deg' }],
        marginTop: -size * 0.08,
        marginLeft: -size * 0.04,
      }}
    />
  )
}

function Checkbox({ checked, defaultChecked, onCheckedChange, disabled, size = 20, style }: CheckboxProps) {
  const theme = useTheme()
  const [value, setValue] = useControllableState<boolean>({
    value: checked,
    defaultValue: defaultChecked ?? false,
    onChange: onCheckedChange,
  })

  const boxStyle: AnyStyle = {
    width: size,
    height: size,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: value ? theme.colors.primary : theme.colors['border-intense'],
    backgroundColor: value ? theme.colors.primary : 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: disabled ? 0.5 : 1,
  }

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: value }}
      disabled={disabled}
      onPress={() => setValue(!value)}
      style={({ pressed }) => cn(boxStyle, pressed && { opacity: 0.7 }, style)}
    >
      {value ? <Check size={size} color={theme.colors['primary-foreground']} /> : null}
    </Pressable>
  )
}

export { Checkbox }
// Re-export the group pieces from their dedicated module so the barrel can pull
// everything from the `checkbox` namespace consistently.
export { CheckboxGroup, useCheckboxGroup } from './CheckboxGroup'
export type { CheckboxGroupProps } from './CheckboxGroup'
