import * as React from 'react'
import { View, type StyleProp } from 'react-native'
import { cn, type AnyStyle } from '../../utils/cn'

interface CheckboxGroupContextValue {
  value: string[]
  toggle: (v: string) => void
  disabled?: boolean
}
const CheckboxGroupContext = React.createContext<CheckboxGroupContextValue | null>(null)

export function useCheckboxGroup() {
  return React.useContext(CheckboxGroupContext)
}

export interface CheckboxGroupProps {
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  disabled?: boolean
  style?: StyleProp<AnyStyle>
  children?: React.ReactNode
}

function CheckboxGroup({ value, defaultValue = [], onValueChange, disabled, style, children }: CheckboxGroupProps) {
  const [internal, setInternal] = React.useState<string[]>(defaultValue)
  const current = value !== undefined ? value : internal
  const toggle = (v: string) => {
    const next = current.includes(v) ? current.filter((x) => x !== v) : [...current, v]
    if (value === undefined) setInternal(next)
    onValueChange?.(next)
  }
  return (
    <CheckboxGroupContext.Provider value={{ value: current, toggle, disabled }}>
      <View style={cn({ gap: 8 }, style)}>{children}</View>
    </CheckboxGroupContext.Provider>
  )
}

export { CheckboxGroup }
