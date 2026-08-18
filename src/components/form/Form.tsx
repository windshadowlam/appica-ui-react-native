import * as React from 'react'
import { View, Text, type ViewProps, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'

export interface LabelProps extends ViewProps {
  required?: boolean
  children?: React.ReactNode
}

function Label({ required, style, children, ...props }: LabelProps) {
  const theme = useTheme()
  return (
    <View style={cn({ flexDirection: 'row', alignItems: 'center', gap: 2, marginBottom: 6 }, style)} {...props}>
      <Text style={{ color: theme.colors['foreground-emphasis'], fontSize: 13, fontWeight: '600' }}>{children}</Text>
      {required ? <Text style={{ color: theme.colors.error, fontSize: 13 }}>*</Text> : null}
    </View>
  )
}

export interface FieldProps {
  label?: React.ReactNode
  description?: React.ReactNode
  error?: React.ReactNode
  required?: boolean
  style?: StyleProp<AnyStyle>
  children?: React.ReactNode
}

/** Field groups a label, control, helper text and error — mirrors Appica's `field`. */
function Field({ label, description, error, required, style, children }: FieldProps) {
  const theme = useTheme()
  return (
    <View style={cn({ gap: 4 }, style)}>
      {label != null ? <Label required={required}>{label}</Label> : null}
      {children}
      {error != null ? (
        <Text style={{ color: theme.colors.error, fontSize: 12 }}>{error}</Text>
      ) : description != null ? (
        <Text style={{ color: theme.colors['foreground-muted'], fontSize: 12 }}>{description}</Text>
      ) : null}
    </View>
  )
}

export interface FieldsetProps extends ViewProps {
  legend?: React.ReactNode
}

function Fieldset({ legend, style, children, ...props }: FieldsetProps) {
  const theme = useTheme()
  return (
    <View style={cn({ gap: 8 }, style)} {...props}>
      {legend != null ? (
        <Text style={{ color: theme.colors['foreground-intense'], fontSize: 14, fontWeight: '600', marginBottom: 2 }}>{legend}</Text>
      ) : null}
      {children}
    </View>
  )
}

export interface FormProps extends ViewProps {
  onSubmit?: () => void
}

function Form({ style, children, ...props }: FormProps) {
  return (
    <View style={cn(style)} {...props}>
      {children}
    </View>
  )
}

export { Label, Field, Fieldset, Form }
