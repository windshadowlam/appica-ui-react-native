import * as React from 'react'
import { View, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'

export interface ToolbarProps {
  /** Set false to remove automatic dividers between children. @default true */
  dividers?: boolean
  style?: StyleProp<AnyStyle>
  children?: React.ReactNode
}

/**
 * Horizontal toolbar that inserts dividers between children.
 * Mirrors Appica's `toolbar`.
 */
function Toolbar({ dividers = true, style, children }: ToolbarProps) {
  const theme = useTheme()
  const kids = React.Children.toArray(children).filter(Boolean)
  return (
    <View style={cn({ flexDirection: 'row', alignItems: 'center', gap: 4, padding: 4, borderRadius: 10, backgroundColor: theme.colors['background-muted'] }, style)}>
      {kids.map((child, i) => (
        <React.Fragment key={i}>
          {i > 0 && dividers ? <View style={{ width: 1, height: 20, backgroundColor: theme.colors['border-strong'] }} /> : null}
          {child}
        </React.Fragment>
      ))}
    </View>
  )
}

export { Toolbar }
