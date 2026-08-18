import * as React from 'react'
import { View, Pressable, Text, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'

interface RadioGroupContextValue {
  value?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  name?: string
}
const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null)

export interface RadioGroupProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  style?: StyleProp<AnyStyle>
  children?: React.ReactNode
}

function RadioGroup({ value, defaultValue, onValueChange, disabled, style, children }: RadioGroupProps) {
  const [internal, setInternal] = React.useState(defaultValue)
  const current = value !== undefined ? value : internal
  return (
    <RadioGroupContext.Provider
      value={{
        value: current,
        disabled,
        onValueChange: (v) => {
          if (value === undefined) setInternal(v)
          onValueChange?.(v)
        },
      }}
    >
      <View style={cn(style)}>{children}</View>
    </RadioGroupContext.Provider>
  )
}

export interface RadioProps {
  value: string
  disabled?: boolean
  size?: number
  style?: StyleProp<AnyStyle>
  children?: React.ReactNode
}

function Radio({ value, disabled, size = 20, style, children }: RadioProps) {
  const theme = useTheme()
  const ctx = React.useContext(RadioGroupContext)
  const selected = ctx?.value === value
  const isDisabled = disabled || ctx?.disabled

  const outer: AnyStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    borderWidth: 2,
    borderColor: selected ? theme.colors.primary : theme.colors['border-intense'],
    alignItems: 'center',
    justifyContent: 'center',
    opacity: isDisabled ? 0.5 : 1,
  }

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected, disabled: isDisabled }}
      disabled={isDisabled}
      onPress={() => ctx?.onValueChange?.(value)}
      style={({ pressed }) => cn({ flexDirection: 'row', alignItems: 'center', gap: 8 }, pressed && { opacity: 0.7 }, style)}
    >
      <View style={outer}>
        {selected ? (
          <View
            style={{
              width: size * 0.45,
              height: size * 0.45,
              borderRadius: size * 0.225,
              backgroundColor: theme.colors.primary,
            }}
          />
        ) : null}
      </View>
      {children != null ? (
        <Text style={{ color: theme.colors['foreground-emphasis'], fontSize: 14 }}>{children}</Text>
      ) : null}
    </Pressable>
  )
}

export { Radio, RadioGroup }
