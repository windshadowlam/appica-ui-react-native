import * as React from 'react'
import { type StyleProp } from 'react-native'
import { Input, type InputProps } from '../input/Input'
import { Field } from '../form/Form'
import { cn, type AnyStyle } from '../../utils/cn'

export interface TextFieldProps extends InputProps {
  label?: React.ReactNode
  description?: React.ReactNode
  error?: React.ReactNode
  /** Convenience for `invalid`. */
  invalid?: boolean
  style?: StyleProp<AnyStyle>
}

/** Labeled text input — composes `Field` + `Input`, matching Appica's `text-field`. */
function TextField({ label, description, error, invalid, style, ...inputProps }: TextFieldProps) {
  return (
    <Field label={label} description={description} error={error} style={style}>
      <Input invalid={invalid} {...inputProps} />
    </Field>
  )
}

export { TextField }
