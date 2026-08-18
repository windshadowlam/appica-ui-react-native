import * as React from 'react'
import { View, Pressable, Text, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'
import { useControllableState } from '../../hooks/use-controllable-state'

interface AccordionContextValue {
  type: 'single' | 'multiple'
  value: string[]
  toggle: (v: string) => void
}
const AccordionContext = React.createContext<AccordionContextValue | null>(null)

interface ItemContextValue {
  value: string
  open: boolean
  toggle: () => void
}
const ItemContext = React.createContext<ItemContextValue | null>(null)

export interface AccordionProps {
  type?: 'single' | 'multiple'
  value?: string | string[]
  defaultValue?: string | string[]
  onValueChange?: (value: string | string[]) => void
  style?: StyleProp<AnyStyle>
  children?: React.ReactNode
}

function Accordion({ type = 'single', value, defaultValue, onValueChange, style, children }: AccordionProps) {
  const theme = useTheme()
  const toArray = (v: string | string[] | undefined) => (Array.isArray(v) ? v : v != null ? [v] : [])
  const [val, setVal] = useControllableState<string[]>({
    value: value !== undefined ? toArray(value) : undefined,
    defaultValue: toArray(defaultValue),
    onChange: (next) => onValueChange?.(type === 'single' ? next[0] ?? '' : next),
  })

  const toggle = (v: string) => {
    const has = val.includes(v)
    const next = type === 'single' ? (has ? [] : [v]) : has ? val.filter((x) => x !== v) : [...val, v]
    setVal(next)
  }

  return (
    <AccordionContext.Provider value={{ type, value: val, toggle }}>
      <View style={cn({ borderRadius: 12, borderWidth: 1, borderColor: theme.colors['border-muted'] }, style)}>{children}</View>
    </AccordionContext.Provider>
  )
}

export interface AccordionItemProps {
  value: string
  style?: StyleProp<AnyStyle>
  children?: React.ReactNode
}

function AccordionItem({ value, style, children }: AccordionItemProps) {
  const theme = useTheme()
  const ctx = React.useContext(AccordionContext)!
  const open = ctx.value.includes(value)
  return (
    <ItemContext.Provider value={{ value, open, toggle: () => ctx.toggle(value) }}>
      <View style={cn({ borderBottomWidth: 1, borderColor: theme.colors['border-muted'] }, style)}>{children}</View>
    </ItemContext.Provider>
  )
}

export interface AccordionTriggerProps {
  style?: StyleProp<AnyStyle>
  children?: React.ReactNode
}

function AccordionTrigger({ style, children }: AccordionTriggerProps) {
  const theme = useTheme()
  const item = React.useContext(ItemContext)!
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ expanded: item.open }}
      onPress={item.toggle}
      style={({ pressed }) => cn({ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, opacity: pressed ? 0.7 : 1 }, style)}
    >
      <Text style={{ color: theme.colors['foreground-intense'], fontSize: 15, fontWeight: '600' }}>{children}</Text>
      <Text style={{ color: theme.colors['foreground-muted'], fontSize: 16, transform: [{ rotate: item.open ? '180deg' : '0deg' }] }}>⌄</Text>
    </Pressable>
  )
}

export interface AccordionContentProps {
  style?: StyleProp<AnyStyle>
  children?: React.ReactNode
}

function AccordionContent({ style, children }: AccordionContentProps) {
  const theme = useTheme()
  const item = React.useContext(ItemContext)!
  if (!item.open) return null
  return <View style={cn({ paddingHorizontal: 16, paddingBottom: 16 }, style)}>{children}</View>
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
