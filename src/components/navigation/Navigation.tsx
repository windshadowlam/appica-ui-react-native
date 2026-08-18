import * as React from 'react'
import { View, Pressable, Text, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'

export interface NavLink {
  label: React.ReactNode
  onPress?: () => void
  active?: boolean
}

export interface NavigationProps {
  links: NavLink[]
  style?: StyleProp<AnyStyle>
}

/** Top navigation bar of links. Mirrors Appica's `navigation`. */
function Navigation({ links, style }: NavigationProps) {
  const theme = useTheme()
  return (
    <View style={cn({ flexDirection: 'row', alignItems: 'center', gap: 4, paddingVertical: 6 }, style)}>
      {links.map((l, i) => (
        <Pressable
          key={i}
          onPress={l.onPress}
          style={({ pressed }) => ({
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 8,
            backgroundColor: l.active ? theme.colors['background-muted'] : 'transparent',
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <Text style={{ color: l.active ? theme.colors['foreground-intense'] : theme.colors['foreground-emphasis'], fontSize: 14, fontWeight: l.active ? '600' : '500' }}>{l.label}</Text>
        </Pressable>
      ))}
    </View>
  )
}

export { Navigation }
