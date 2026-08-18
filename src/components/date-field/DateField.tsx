import * as React from 'react'
import { View, Text, TextInput, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'

export interface DateFieldProps {
  value?: Date
  defaultValue?: Date
  onChange?: (date: Date | undefined) => void
  disabled?: boolean
  style?: StyleProp<AnyStyle>
}

const segStyle = (theme: ReturnType<typeof useTheme>, w: number, flex = false): AnyStyle => ({
  width: flex ? undefined : w,
  flex: flex ? 1 : 0,
  height: 40,
  textAlign: 'center',
  color: theme.colors.foreground,
  fontSize: 14,
})

/** Structured date entry (MM / DD / YYYY). Mirrors Appica's `date-field`. */
function DateField({ value, defaultValue, onChange, disabled, style }: DateFieldProps) {
  const theme = useTheme()
  const init = value ?? defaultValue
  const [parts, setParts] = React.useState({
    m: init ? String(init.getMonth() + 1).padStart(2, '0') : '',
    d: init ? String(init.getDate()).padStart(2, '0') : '',
    y: init ? String(init.getFullYear()) : '',
  })

  const commit = (next: typeof parts) => {
    setParts(next)
    const mm = parseInt(next.m, 10)
    const dd = parseInt(next.d, 10)
    const yy = parseInt(next.y, 10)
    if (mm >= 1 && mm <= 12 && dd >= 1 && dd <= 31 && yy > 0) {
      const date = new Date(yy, mm - 1, dd)
      onChange?.(date)
    } else {
      onChange?.(undefined)
    }
  }

  const frame: AnyStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors['border-strong'],
    backgroundColor: theme.colors.background,
    opacity: disabled ? 0.5 : 1,
  }

  return (
    <View style={cn(frame, style)}>
      <TextInput style={segStyle(theme, 34)} editable={!disabled} keyboardType="number-pad" maxLength={2} placeholder="MM" placeholderTextColor={theme.colors['foreground-subtle']} value={parts.m} onChangeText={(t) => commit({ ...parts, m: t.replace(/\D/g, '') })} />
      <Text style={{ color: theme.colors['foreground-muted'] }}>/</Text>
      <TextInput style={segStyle(theme, 34)} editable={!disabled} keyboardType="number-pad" maxLength={2} placeholder="DD" placeholderTextColor={theme.colors['foreground-subtle']} value={parts.d} onChangeText={(t) => commit({ ...parts, d: t.replace(/\D/g, '') })} />
      <Text style={{ color: theme.colors['foreground-muted'] }}>/</Text>
      <TextInput style={segStyle(theme, 0, true)} editable={!disabled} keyboardType="number-pad" maxLength={4} placeholder="YYYY" placeholderTextColor={theme.colors['foreground-subtle']} value={parts.y} onChangeText={(t) => commit({ ...parts, y: t.replace(/\D/g, '') })} />
    </View>
  )
}

export { DateField }
