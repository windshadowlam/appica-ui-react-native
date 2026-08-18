import * as React from 'react'
import { View, Pressable, type StyleProp } from 'react-native'
import { cn, type AnyStyle } from '../../utils/cn'
import { useControllableState } from '../../hooks/use-controllable-state'

interface CollapsibleContextValue {
  open: boolean
  toggle: () => void
  disabled?: boolean
}
const CollapsibleContext = React.createContext<CollapsibleContextValue | null>(null)

export interface CollapsibleProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  disabled?: boolean
  style?: StyleProp<AnyStyle>
  children?: React.ReactNode
}

function Collapsible({ open, defaultOpen, onOpenChange, disabled, style, children }: CollapsibleProps) {
  const [val, setVal] = useControllableState<boolean>({
    value: open,
    defaultValue: defaultOpen ?? false,
    onChange: onOpenChange,
  })
  return (
    <CollapsibleContext.Provider value={{ open: val, disabled, toggle: () => setVal((p) => !p) }}>
      <View style={cn(style)}>{children}</View>
    </CollapsibleContext.Provider>
  )
}

export interface CollapsibleTriggerProps {
  style?: StyleProp<AnyStyle>
  children?: React.ReactNode
}

function CollapsibleTrigger({ style, children }: CollapsibleTriggerProps) {
  const ctx = React.useContext(CollapsibleContext)!
  return (
    <Pressable disabled={ctx.disabled} onPress={ctx.toggle} style={({ pressed }) => cn(pressed && { opacity: 0.7 }, style)}>
      {children}
    </Pressable>
  )
}

export interface CollapsibleContentProps {
  style?: StyleProp<AnyStyle>
  children?: React.ReactNode
}

function CollapsibleContent({ style, children }: CollapsibleContentProps) {
  const ctx = React.useContext(CollapsibleContext)!
  if (!ctx.open) return null
  return <View style={cn(style)}>{children}</View>
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
