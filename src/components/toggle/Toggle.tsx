import * as React from 'react'
import { Pressable, View, Text, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'

interface ToggleGroupContextValue {
  value: string[]
  onValueChange?: (value: string[]) => void
  multiple?: boolean
  disabled?: boolean
}
const ToggleGroupContext = React.createContext<ToggleGroupContextValue | null>(null)

export interface ToggleProps {
  value?: string
  pressed?: boolean
  defaultPressed?: boolean
  onPressedChange?: (pressed: boolean) => void
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  style?: StyleProp<AnyStyle>
  children?: React.ReactNode
}

/**
 * A two-state button. Standalone when `pressed`/`onPressedChange` are used;
 * inside a `ToggleGroup` it participates in group selection by `value`.
 */
function Toggle({
  value,
  pressed,
  defaultPressed,
  onPressedChange,
  disabled,
  size = 'md',
  style,
  children,
}: ToggleProps) {
  const theme = useTheme()
  const group = React.useContext(ToggleGroupContext)
  const isGrouped = Boolean(group && value != null)

  const [internal, setInternal] = React.useState(defaultPressed ?? false)
  const isPressed = isGrouped ? group!.value.includes(value!) : pressed !== undefined ? pressed : internal

  const dims = size === 'sm' ? { h: 28, pad: 10, fs: 12 } : size === 'lg' ? { h: 40, pad: 16, fs: 16 } : { h: 34, pad: 14, fs: 14 }

  const activate = () => {
    if (isGrouped) {
      const arr = group!.value
      const next = arr.includes(value!) ? arr.filter((v) => v !== value) : [...arr, value!]
      group!.onValueChange?.(next)
    } else {
      const next = !isPressed
      if (pressed === undefined) setInternal(next)
      onPressedChange?.(next)
    }
  }

  const container: AnyStyle = {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: dims.h,
    paddingHorizontal: dims.pad,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: isPressed ? theme.colors.primary : theme.colors['border-strong'],
    backgroundColor: isPressed ? theme.colors['primary-soft'] : theme.colors.background,
    opacity: disabled ? 0.5 : 1,
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: isPressed }}
      disabled={disabled}
      onPress={activate}
      style={({ pr }) => cn(container, pr && { opacity: 0.7 }, style)}
    >
      {children != null ? (
        typeof children === 'string' ? (
          <Text style={{ color: isPressed ? theme.colors['foreground-intense'] : theme.colors['foreground-emphasis'], fontSize: dims.fs, fontWeight: '500' }}>
            {children}
          </Text>
        ) : (
          children
        )
      ) : null}
    </Pressable>
  )
}

export interface ToggleGroupProps {
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  multiple?: boolean
  disabled?: boolean
  style?: StyleProp<AnyStyle>
  children?: React.ReactNode
}

function ToggleGroup({ value, defaultValue = [], onValueChange, multiple = false, disabled, style, children }: ToggleGroupProps) {
  const [internal, setInternal] = React.useState<string[]>(defaultValue)
  const current = value !== undefined ? value : internal

  const handle = (next: string[]) => {
    if (value === undefined) setInternal(next)
    onValueChange?.(next)
  }

  const ctx: ToggleGroupContextValue = {
    value: current,
    disabled,
    multiple,
    onValueChange: (v) => {
      if (!multiple) {
        // single-select: a press toggles to a one-item array or empty
        handle(v.length ? [v[0]] : [])
      } else {
        handle(v)
      }
    },
  }

  return (
    <ToggleGroupContext.Provider value={ctx}>
      <View style={cn({ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }, style)}>{children}</View>
    </ToggleGroupContext.Provider>
  )
}

export { Toggle, ToggleGroup }
