import * as React from 'react'
import { View, TextInput, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'

export interface OtpFieldProps {
  /** Number of cells. @default 6 */
  length?: number
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  size?: number
  style?: StyleProp<AnyStyle>
}

/**
 * One-time-passcode entry with auto-advancing cells. Mirrors Appica's `otp-field`.
 */
function OtpField({ length = 6, value, defaultValue = '', onValueChange, disabled, size = 44, style }: OtpFieldProps) {
  const theme = useTheme()
  const isControlled = value !== undefined
  const [internal, setInternal] = React.useState(defaultValue)
  const current = isControlled ? value : internal
  const refs = React.useRef<(TextInput | null)[]>([])

  const setChar = (index: number, char: string) => {
    const arr = current.split('')
    arr[index] = char
    const next = arr.join('').slice(0, length)
    if (!isControlled) setInternal(next)
    onValueChange?.(next)
  }

  const handleChange = (index: number, text: string) => {
    const t = text.replace(/\D/g, '')
    if (!t) {
      setChar(index, '')
      return
    }
    // support paste of multiple chars
    const chars = t.split('')
    let i = index
    for (const c of chars) {
      if (i >= length) break
      setChar(i, c)
      i++
    }
    const focusIndex = Math.min(i, length - 1)
    refs.current[focusIndex]?.focus()
  }

  return (
    <View style={cn({ flexDirection: 'row', gap: 8 }, style)}>
      {Array.from({ length }).map((_, i) => {
        const filled = Boolean(current[i])
        return (
          <TextInput
            key={i}
            ref={(el) => {
              refs.current[i] = el
            }}
            editable={!disabled}
            keyboardType="number-pad"
            maxLength={1}
            value={current[i] ?? ''}
            onChangeText={(t) => handleChange(i, t)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace' && !current[i] && i > 0) {
                refs.current[i - 1]?.focus()
              }
            }}
            style={{
              width: size,
              height: size,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: filled ? theme.colors.primary : theme.colors['border-strong'],
              backgroundColor: filled ? theme.colors['primary-soft'] : theme.colors.background,
              textAlign: 'center',
              color: theme.colors['foreground-intense'],
              fontSize: size * 0.4,
              fontWeight: '600',
              opacity: disabled ? 0.5 : 1,
            }}
          />
        )
      })}
    </View>
  )
}

export { OtpField }
