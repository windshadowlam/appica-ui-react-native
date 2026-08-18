import * as React from 'react'
import { View, Text, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'
import { type BadgeColor } from '../badge/Badge'

export type AlertColor = BadgeColor

export interface AlertProps {
  color?: AlertColor
  /** Icon node rendered at the start. */
  icon?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  /** Actions rendered on the trailing edge. */
  actions?: React.ReactNode
  style?: StyleProp<AnyStyle>
  children?: React.ReactNode
}

function Alert({ color = 'info', icon, title, description, actions, style, children }: AlertProps) {
  const theme = useTheme()
  const accent = theme.colors[`${color}-soft` as keyof typeof theme.colors] ?? theme.colors['background-muted']
  const border = theme.colors[`${color}-emphasis` as keyof typeof theme.colors] ?? theme.colors['border-strong']
  const fg = theme.colors[`${color}-strong` as keyof typeof theme.colors] ?? theme.colors['foreground-emphasis']

  return (
    <View
      style={cn(
        {
          flexDirection: 'row',
          gap: 12,
          padding: 14,
          borderRadius: 12,
          backgroundColor: accent,
          borderWidth: 1,
          borderColor: border,
          borderLeftWidth: 4,
        },
        style,
      )}
    >
      {icon ? <View style={{ marginTop: 1 }}>{icon}</View> : null}
      <View style={{ flex: 1, gap: 2 }}>
        {title != null ? (
          typeof title === 'string' ? (
            <Text style={{ color: fg, fontSize: 14, fontWeight: '600' }}>{title}</Text>
          ) : (
            title
          )
        ) : null}
        {description != null ? (
          typeof description === 'string' ? (
            <Text style={{ color: theme.colors['foreground-emphasis'], fontSize: 13, lineHeight: 18 }}>{description}</Text>
          ) : (
            description
          )
        ) : null}
        {children}
      </View>
      {actions ? <View style={{ alignItems: 'flex-end' }}>{actions}</View> : null}
    </View>
  )
}

export { Alert }
