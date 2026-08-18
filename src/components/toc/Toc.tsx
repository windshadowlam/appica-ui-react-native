import * as React from 'react'
import { View, Pressable, Text, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'

export interface TocItem {
  id: string
  label: React.ReactNode
  /** Heading depth, used for indentation. @default 1 */
  level?: number
}

export interface TocProps {
  items: TocItem[]
  activeId?: string
  onSelect?: (id: string) => void
  style?: StyleProp<AnyStyle>
}

/** Table of contents with active-section highlighting. Mirrors Appica's `toc`. */
function Toc({ items, activeId, onSelect, style }: TocProps) {
  const theme = useTheme()
  return (
    <View style={cn({ gap: 2 }, style)}>
      {items.map((it) => {
        const active = it.id === activeId
        const indent = ((it.level ?? 1) - 1) * 12
        return (
          <Pressable
            key={it.id}
            onPress={() => onSelect?.(it.id)}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              paddingVertical: 6,
              paddingHorizontal: 10,
              paddingLeft: 10 + indent,
              borderRadius: 8,
              backgroundColor: active ? theme.colors['primary-soft'] : pressed ? theme.colors['background-muted'] : 'transparent',
            })}
          >
            <View style={{ width: 3, height: 14, borderRadius: 2, backgroundColor: active ? theme.colors.primary : 'transparent' }} />
            <Text style={{ color: active ? theme.colors['foreground-intense'] : theme.colors['foreground-muted'], fontSize: 13, fontWeight: active ? '600' : '400' }}>{it.label}</Text>
          </Pressable>
        )
      })}
    </View>
  )
}

export { Toc }
