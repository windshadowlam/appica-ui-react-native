import * as React from 'react'
import { View, TextInput, type TextInputProps, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'
import { type InputVariant, type InputSize } from '../input/Input'

export interface TextareaProps extends Omit<TextInputProps, 'style' | 'multiline' | 'editable'> {
  variant?: InputVariant
  inputSize?: InputSize
  invalid?: boolean
  disabled?: boolean
  style?: StyleProp<AnyStyle>
}

const SIZE_MAP: Record<InputSize, { padding: number; fontSize: number; radius: number }> = {
  sm: { padding: 10, fontSize: 12, radius: 8 },
  md: { padding: 12, fontSize: 14, radius: 10 },
  lg: { padding: 14, fontSize: 16, radius: 12 },
}

function Textarea({
  variant = 'outline',
  inputSize = 'md',
  invalid,
  disabled,
  style,
  numberOfLines = 3,
  ...props
}: TextareaProps) {
  const theme = useTheme()
  const dims = SIZE_MAP[inputSize]
  const frameStyle: AnyStyle = {
    padding: dims.padding,
    borderRadius: dims.radius,
    backgroundColor: variant === 'soft' ? theme.colors['background-muted'] : theme.colors.background,
    borderWidth: variant === 'outline' ? 1 : 0,
    borderColor: invalid ? theme.colors.error : theme.colors['border-strong'],
    opacity: disabled ? 0.5 : 1,
  }
  return (
    <View style={cn(frameStyle, style)}>
      <TextInput
        multiline
        editable={!disabled}
        numberOfLines={numberOfLines}
        textAlignVertical="top"
        placeholderTextColor={theme.colors['foreground-subtle']}
        style={{ color: theme.colors.foreground, fontSize: dims.fontSize, minHeight: numberOfLines * (dims.fontSize + 6) }}
        {...props}
      />
    </View>
  )
}

export { Textarea }
