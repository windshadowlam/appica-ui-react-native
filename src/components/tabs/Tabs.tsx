import * as React from 'react'
import { View, Pressable, Text, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'
import { useControllableState } from '../../hooks/use-controllable-state'

interface TabsContextValue {
  value: string
  onValueChange: (v: string) => void
}
const TabsContext = React.createContext<TabsContextValue | null>(null)

export interface TabsProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  style?: StyleProp<AnyStyle>
  children?: React.ReactNode
}

function Tabs({ value, defaultValue, onValueChange, style, children }: TabsProps) {
  const [val, setVal] = useControllableState<string>({
    value,
    defaultValue: defaultValue ?? '',
    onChange: onValueChange,
  })
  return (
    <TabsContext.Provider value={{ value: val, onValueChange: setVal }}>{<View style={cn(style)}>{children}</View>}</TabsContext.Provider>
  )
}

export interface TabsListProps {
  style?: StyleProp<AnyStyle>
  children?: React.ReactNode
}

function TabsList({ style, children }: TabsListProps) {
  const theme = useTheme()
  return (
    <View
      style={cn(
        {
          flexDirection: 'row',
          gap: 4,
          padding: 4,
          borderRadius: 10,
          backgroundColor: theme.colors['background-muted'],
          alignSelf: 'flex-start',
        },
        style,
      )}
    >
      {children}
    </View>
  )
}

export interface TabsTriggerProps {
  value: string
  disabled?: boolean
  style?: StyleProp<AnyStyle>
  children?: React.ReactNode
}

function TabsTrigger({ value, disabled, style, children }: TabsTriggerProps) {
  const theme = useTheme()
  const ctx = React.useContext(TabsContext)!
  const active = ctx.value === value
  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{ selected: active, disabled }}
      disabled={disabled}
      onPress={() => ctx.onValueChange(value)}
      style={({ pressed }) =>
        cn(
          {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 7,
            paddingHorizontal: 14,
            borderRadius: 7,
            backgroundColor: active ? theme.colors.background : 'transparent',
            shadowColor: '#000',
            shadowOpacity: active ? 0.06 : 0,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: 1 },
            opacity: disabled ? 0.5 : pressed ? 0.8 : 1,
          },
          style,
        )
      }
    >
      <Text style={{ color: active ? theme.colors['foreground-intense'] : theme.colors['foreground-muted'], fontSize: 14, fontWeight: active ? '600' : '500' }}>
        {children}
      </Text>
    </Pressable>
  )
}

export interface TabsContentProps {
  value: string
  style?: StyleProp<AnyStyle>
  children?: React.ReactNode
}

function TabsContent({ value, style, children }: TabsContentProps) {
  const ctx = React.useContext(TabsContext)!
  if (ctx.value !== value) return null
  return <View style={cn({ paddingTop: 12 }, style)}>{children}</View>
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
