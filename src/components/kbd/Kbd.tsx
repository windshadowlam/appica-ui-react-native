import * as React from 'react'
import { View, Text, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'

export interface KbdProps {
  style?: StyleProp<AnyStyle>
  children?: React.ReactNode
}

/** Renders a keyboard key. Mirrors Appica's `kbd`. */
function Kbd({ style, children }: KbdProps) {
  const theme = useTheme()
  return (
    <View
      style={cn(
        {
          alignSelf: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 22,
          height: 22,
          paddingHorizontal: 6,
          borderRadius: 6,
          backgroundColor: theme.colors['background-muted'],
          borderWidth: 1,
          borderColor: theme.colors['border-strong'],
          borderBottomWidth: 2,
        },
        style,
      )}
    >
      <Text style={{ color: theme.colors['foreground-emphasis'], fontSize: 12, fontWeight: '600' }}>{children}</Text>
    </View>
  )
}

export { Kbd }
