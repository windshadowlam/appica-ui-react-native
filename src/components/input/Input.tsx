import * as React from 'react'
import { View, TextInput, type TextInputProps, type StyleProp, type ViewStyle } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'

export type InputVariant = 'outline' | 'soft'
export type InputSize = 'sm' | 'md' | 'lg'

export interface InputProps extends Omit<TextInputProps, 'style' | 'editable'> {
  /** Field appearance. @default 'outline' */
  variant?: InputVariant
  /** Scales height, padding, text. @default 'md' */
  inputSize?: InputSize
  /** Show a clear (✕) button once the field has a value. @default false */
  clearable?: boolean
  /** Adornment rendered before the field, inside the frame. */
  startSlot?: React.ReactNode
  /** Adornment rendered after the field, inside the frame. */
  endSlot?: React.ReactNode
  /** Marks the field invalid (error styling). */
  invalid?: boolean
  disabled?: boolean
  /** Called when the clear button is pressed. */
  onClear?: () => void
  style?: StyleProp<AnyStyle>
}

const SIZE_MAP: Record<InputSize, { height: number; paddingH: number; fontSize: number; radius: number; gap: number }> = {
  sm: { height: 32, paddingH: 12, fontSize: 12, radius: 8, gap: 6 },
  md: { height: 40, paddingH: 14, fontSize: 14, radius: 10, gap: 8 },
  lg: { height: 48, paddingH: 16, fontSize: 16, radius: 12, gap: 8 },
}

function Input({
  variant = 'outline',
  inputSize = 'md',
  clearable,
  startSlot,
  endSlot,
  invalid,
  disabled,
  onClear,
  style,
  value,
  onChangeText,
  ...props
}: InputProps) {
  const theme = useTheme()
  const dims = SIZE_MAP[inputSize]
  const hasWrapper = Boolean(clearable || startSlot || endSlot)
  const [internal, setInternal] = React.useState('')

  const currentValue = value !== undefined ? value : internal
  const showClear = clearable && currentValue.length > 0

  const handleChange = (text: string) => {
    if (value === undefined) setInternal(text)
    onChangeText?.(text)
  }

  const frameStyle: AnyStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: dims.gap,
    height: dims.height,
    paddingHorizontal: dims.paddingH,
    borderRadius: dims.radius,
    backgroundColor: variant === 'soft' ? theme.colors['background-muted'] : theme.colors.background,
    borderWidth: variant === 'outline' ? 1 : 0,
    borderColor: invalid ? theme.colors.error : theme.colors['border-strong'],
    opacity: disabled ? 0.5 : 1,
  }

  const fieldStyle: AnyStyle = {
    flex: 1,
    minWidth: 0,
    height: '100%' as unknown as number,
    color: theme.colors.foreground,
    fontSize: dims.fontSize,
    paddingVertical: 0,
  }

  const inputEl = (
    <TextInput
      editable={!disabled}
      value={currentValue}
      onChangeText={handleChange}
      placeholderTextColor={theme.colors['foreground-subtle']}
      style={fieldStyle}
      {...props}
    />
  )

  if (!hasWrapper) {
    return (
      <View style={cn(frameStyle, style)}>
        {inputEl}
      </View>
    )
  }

  return (
    <View style={cn(frameStyle, style)}>
      {startSlot ? <View style={{ marginLeft: -4 }}>{startSlot}</View> : null}
      {inputEl}
      {showClear ? (
        <ClearButton
          color={theme.colors['foreground-subtle']}
          onPress={() => {
            handleChange('')
            onClear?.()
          }}
        />
      ) : null}
      {endSlot ? <View style={{ marginRight: -4 }}>{endSlot}</View> : null}
    </View>
  )
}

function ClearButton({ color, onPress }: { color: string; onPress: () => void }) {
  return (
    <View
      accessibilityRole="button"
      onTouchEnd={onPress}
      style={{ padding: 2 }}
    >
      <View style={{ width: 16, height: 16, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: 12, height: 2, backgroundColor: color, borderRadius: 1, transform: [{ rotate: '45deg' }] }} />
        <View style={{ width: 12, height: 2, backgroundColor: color, borderRadius: 1, position: 'absolute', transform: [{ rotate: '-45deg' }] }} />
      </View>
    </View>
  )
}

export { Input }
