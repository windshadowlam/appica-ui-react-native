import * as React from 'react'
import { View, Text, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'
import { type AppicaColorTokens } from '../../theme/tokens-types'

export type BadgeColor = 'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'info'
export type BadgeAppearance = 'solid' | 'soft' | 'outline'

export interface BadgeProps {
  color?: BadgeColor
  /** @default 'soft' */
  appearance?: BadgeAppearance
  /** @default 'md' */
  size?: 'sm' | 'md'
  style?: StyleProp<AnyStyle>
  children?: React.ReactNode
}

function pick(colors: AppicaColorTokens, color: BadgeColor): { bg: string; fg: string; border: string; soft: string } {
  const strong = colors[color]
  const soft = colors[`${color}-soft` as keyof AppicaColorTokens] ?? colors['background-muted']
  const fg = colors[`${color}-foreground` as keyof AppicaColorTokens] ?? colors.foreground
  return { bg: strong, fg, border: strong, soft }
}

function Badge({ color = 'primary', appearance = 'soft', size = 'md', style, children }: BadgeProps) {
  const theme = useTheme()
  const c = pick(theme.colors, color)

  const container: AnyStyle = {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: size === 'sm' ? 8 : 10,
    paddingVertical: size === 'sm' ? 2 : 3,
    borderRadius: 999,
    ...(appearance === 'solid'
      ? { backgroundColor: c.bg }
      : appearance === 'outline'
        ? { borderWidth: 1, borderColor: c.border }
        : { backgroundColor: c.soft }),
  }

  const labelColor =
    appearance === 'solid' ? c.fg : appearance === 'outline' ? c.border : c.bg

  return (
    <View style={cn(container, style)}>
      {typeof children === 'string' || typeof children === 'number' ? (
        <Text
          style={{
            color: labelColor,
            fontSize: size === 'sm' ? 11 : 12,
            fontWeight: '600',
          }}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  )
}

export { Badge }
