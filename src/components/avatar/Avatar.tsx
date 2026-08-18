import * as React from 'react'
import { View, Text, Image, type StyleProp, type ImageSourcePropType } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'

export interface AvatarProps {
  /** Pixel size of the square/circle. @default 40 */
  size?: number
  /** @default 'circle' */
  shape?: 'circle' | 'square'
  /** Remote or local image source. */
  source?: ImageSourcePropType
  /** Fallback content shown when there is no image (initials, icon). */
  children?: React.ReactNode
  /** Background behind the fallback. */
  fallbackColor?: string
  style?: StyleProp<AnyStyle>
}

function Avatar({
  size = 40,
  shape = 'circle',
  source,
  children,
  fallbackColor,
  style,
}: AvatarProps) {
  const theme = useTheme()
  const frame: AnyStyle = {
    width: size,
    height: size,
    borderRadius: shape === 'circle' ? size / 2 : Math.max(4, size * 0.22),
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: fallbackColor ?? theme.colors['background-muted'],
  }
  return (
    <View style={cn(frame, style)}>
      {source ? <Image source={source} style={{ width: size, height: size }} /> : null}
      {!source && children ? (
        typeof children === 'string' ? (
          <Text style={{ color: theme.colors['foreground-emphasis'], fontSize: size * 0.4, fontWeight: '600' }}>
            {children}
          </Text>
        ) : (
          children
        )
      ) : null}
    </View>
  )
}

export interface AvatarGroupProps {
  max?: number
  spacing?: number
  style?: StyleProp<AnyStyle>
  children?: React.ReactNode
}

function AvatarGroup({ max, spacing = -8, style, children }: AvatarGroupProps) {
  const theme = useTheme()
  const kids = React.Children.toArray(children).filter(Boolean)
  const shown = max != null ? kids.slice(0, max) : kids
  const overflow = max != null ? kids.length - max : 0

  return (
    <View style={cn({ flexDirection: 'row', alignItems: 'center' }, style)}>
      {shown.map((child, i) => (
        <View
          key={i}
          style={{
            marginLeft: i === 0 ? 0 : spacing,
            borderWidth: 2,
            borderColor: theme.colors.background,
            borderRadius: 999,
          }}
        >
          {child}
        </View>
      ))}
      {overflow > 0 ? (
        <View
          style={{
            marginLeft: spacing,
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: theme.colors['background-strong'],
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 2,
            borderColor: theme.colors.background,
          }}
        >
          <Text style={{ color: theme.colors['foreground-emphasis'], fontSize: 14, fontWeight: '600' }}>
            +{overflow}
          </Text>
        </View>
      ) : null}
    </View>
  )
}

export { Avatar, AvatarGroup }
