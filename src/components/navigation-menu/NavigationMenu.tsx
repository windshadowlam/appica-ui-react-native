import * as React from 'react'
import { View, Pressable, Text, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'

export interface NavigationMenuItem {
  value: string
  label: React.ReactNode
  content?: React.ReactNode
}

export interface NavigationMenuProps {
  items: NavigationMenuItem[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  style?: StyleProp<AnyStyle>
}

/**
 * Top-level navigation with trigger labels and an expanding content region.
 * Mirrors Appica's `navigation-menu`.
 */
function NavigationMenu({ items, value, defaultValue, onValueChange, style }: NavigationMenuProps) {
  const theme = useTheme()
  const [active, setActive] = React.useState(defaultValue ?? items[0]?.value)
  const current = value !== undefined ? value : active
  const currentItem = items.find((i) => i.value === current)

  return (
    <View style={cn(style)}>
      <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
        {items.map((it) => {
          const isActive = it.value === current
          return (
            <Pressable
              key={it.value}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              onPress={() => {
                if (value === undefined) setActive(it.value)
                onValueChange?.(it.value)
              }}
              style={({ pressed }) =>
                cn(
                  {
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    borderRadius: 8,
                    backgroundColor: isActive ? theme.colors['background-muted'] : 'transparent',
                    opacity: pressed ? 0.7 : 1,
                  },
                )
              }
            >
              <Text style={{ color: isActive ? theme.colors['foreground-intense'] : theme.colors['foreground-emphasis'], fontSize: 14, fontWeight: isActive ? '600' : '500' }}>
                {it.label}
              </Text>
            </Pressable>
          )
        })}
      </View>
      {currentItem?.content != null ? (
        <View style={{ marginTop: 8 }}>{currentItem.content}</View>
      ) : null}
    </View>
  )
}

export { NavigationMenu }
