import * as React from 'react'
import { View, Text, type ViewProps, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'

const CARD_RADIUS = 16
const FRAME_RADIUS = 21

type CardFrame = 'none' | 'solid' | 'glass'

export interface CardProps extends ViewProps {
  /** Wrap content in a padded frame. `true` ⇒ 'solid'; 'glass' is translucent + blurred. @default false */
  frame?: boolean | 'solid' | 'glass'
  /** Float slots inside content so media rounds all corners. @default true */
  inset?: boolean
  /** Escape hatch for the inner content wrapper. */
  contentProps?: ViewProps
  /** Render as a different element, e.g. render={Pressable}. */
  render?: React.ElementType
}

function Card({ frame = false, inset = true, contentProps, render, style, children, ...props }: CardProps) {
  const theme = useTheme()
  const variant: CardFrame = frame === true ? 'solid' : frame === false ? 'none' : frame

  const frameStyle: AnyStyle =
    variant === 'none'
      ? { borderRadius: CARD_RADIUS }
      : variant === 'solid'
        ? { borderRadius: FRAME_RADIUS, backgroundColor: theme.colors['background-subtle'], padding: 8 }
        : { borderRadius: FRAME_RADIUS, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)', backgroundColor: 'rgba(255,255,255,0.10)', padding: 8 }

  const contentStyle: AnyStyle = {
    backgroundColor: theme.colors.background,
    flex: 1,
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
    ...(variant === 'solid' || variant === 'glass' ? { borderWidth: 1, borderColor: theme.colors['border-muted'] } : {}),
    ...(inset ? { padding: 8 } : {}),
  }

  const container = (
    <View
      data-slot="card"
      style={cn({ flexDirection: 'column' }, frameStyle, style)}
      {...props}
    >
      <View data-slot="card-content" style={cn(contentStyle, contentProps?.style as AnyStyle)} {...contentProps}>
        {children}
      </View>
    </View>
  )

  if (render) {
    const Render = render
    return <Render style={cn({ flexDirection: 'column' }, frameStyle, style)} {...props}>{container}</Render>
  }
  return container
}

export interface CardMediaProps extends ViewProps {}

function CardMedia({ style, ...props }: CardMediaProps) {
  return (
    <View
      data-slot="card-media"
      style={cn({ position: 'relative', overflow: 'hidden', borderRadius: 12 }, style)}
      {...props}
    />
  )
}

export interface CardHeaderProps extends ViewProps {}

function CardHeader({ style, ...props }: CardHeaderProps) {
  return <View data-slot="card-header" style={cn({ flexDirection: 'column', gap: 6, padding: 24 }, style)} {...props} />
}

export interface CardTitleProps extends ViewProps {}

function CardTitle({ style, ...props }: CardTitleProps) {
  return <Text data-slot="card-title" style={cn({ color: '#101828', fontSize: 18, fontWeight: '600' }, style as AnyStyle)} {...props} />
}

export interface CardDescriptionProps extends ViewProps {}

function CardDescription({ style, ...props }: CardDescriptionProps) {
  const theme = useTheme()
  return (
    <Text
      data-slot="card-description"
      style={cn({ color: theme.colors['foreground-muted'], fontSize: 14 }, style as AnyStyle)}
      {...props}
    />
  )
}

export interface CardFooterProps extends ViewProps {}

function CardFooter({ style, ...props }: CardFooterProps) {
  return (
    <View
      data-slot="card-footer"
      style={cn({ flexDirection: 'column-reverse', gap: 8, paddingHorizontal: 24, paddingBottom: 24 }, style)}
      {...props}
    />
  )
}

export { Card, CardMedia, CardHeader, CardTitle, CardDescription, CardFooter }
