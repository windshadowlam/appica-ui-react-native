import * as React from 'react'
import { View, Text, TextInput, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'

export interface TimeFieldProps {
  /** 24h hour (0–23) and minute (0–59). */
  hour?: number
  minute?: number
  onChange?: (hour: number, minute: number) => void
  disabled?: boolean
  style?: StyleProp<AnyStyle>
}

/** Structured time entry (HH : MM, 24h). Mirrors Appica's `time-field`. */
function TimeField({ hour, minute, onChange, disabled, style }: TimeFieldProps) {
  const theme = useTheme()
  const [h, setH] = React.useState(hour != null ? String(hour).padStart(2, '0') : '')
  const [m, setM] = React.useState(minute != null ? String(minute).padStart(2, '0') : '')

  const commit = (nh: string, nm: string) => {
    setH(nh)
    setM(nm)
    const hh = parseInt(nh, 10)
    const mm = parseInt(nm, 10)
    if (hh >= 0 && hh <= 23 && mm >= 0 && mm <= 59) onChange?.(hh, mm)
  }

  const frame: AnyStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors['border-strong'],
    backgroundColor: theme.colors.background,
    alignSelf: 'flex-start',
    opacity: disabled ? 0.5 : 1,
  }

  return (
    <View style={cn(frame, style)}>
      <TextInput style={{ width: 36, height: 40, textAlign: 'center', color: theme.colors.foreground, fontSize: 14 }} editable={!disabled} keyboardType="number-pad" maxLength={2} placeholder="HH" placeholderTextColor={theme.colors['foreground-subtle']} value={h} onChangeText={(t) => commit(t.replace(/\D/g, ''), m)} />
      <Text style={{ color: theme.colors['foreground-muted'], fontSize: 16 }}>:</Text>
      <TextInput style={{ width: 36, height: 40, textAlign: 'center', color: theme.colors.foreground, fontSize: 14 }} editable={!disabled} keyboardType="number-pad" maxLength={2} placeholder="MM" placeholderTextColor={theme.colors['foreground-subtle']} value={m} onChangeText={(t) => commit(h, t.replace(/\D/g, ''))} />
    </View>
  )
}

export { TimeField }
