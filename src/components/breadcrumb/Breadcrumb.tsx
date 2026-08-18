import * as React from 'react'
import { View, Pressable, Text, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'

export interface BreadcrumbItem {
  label: React.ReactNode
  onPress?: () => void
}

export interface BreadcrumbProps {
  items?: BreadcrumbItem[]
  separator?: React.ReactNode
  style?: StyleProp<AnyStyle>
  children?: React.ReactNode
}

/**
 * Breadcrumb trail. Pass `items` for a simple list, or `children` for custom
 * rendering. Mirrors Appica's `breadcrumb`.
 */
function Breadcrumb({ items, separator = '/', style, children }: BreadcrumbProps) {
  const theme = useTheme()
  const sep = <Text style={{ color: theme.colors['foreground-muted'], fontSize: 14, marginHorizontal: 6 }}>{separator}</Text>

  if (children) return <View style={cn({ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }, style)}>{children}</View>

  return (
    <View style={cn({ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }, style)}>
      {items?.map((it, i) => {
        const last = i === items.length - 1
        return (
          <React.Fragment key={i}>
            <Pressable disabled={last || !it.onPress} onPress={it.onPress}>
              <Text style={{ color: last ? theme.colors['foreground-intense'] : theme.colors['foreground-muted'], fontSize: 14, fontWeight: last ? '600' : '400' }}>
                {it.label}
              </Text>
            </Pressable>
            {!last ? sep : null}
          </React.Fragment>
        )
      })}
    </View>
  )
}

export { Breadcrumb }
