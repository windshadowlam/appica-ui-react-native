import * as React from 'react'
import { ScrollView, type ScrollViewProps, type StyleProp } from 'react-native'
import { cn, type AnyStyle } from '../../utils/cn'

export interface ScrollAreaProps extends ScrollViewProps {
  style?: StyleProp<AnyStyle>
  children?: React.ReactNode
}

/**
 * Scrollable region with a styled scrollbar affordance. Mirrors Appica's
 * `scroll-area` (a styled ScrollView with momentum scrolling + hidden scrollbar
 * by default; pass `showsVerticalScrollIndicator` to reveal it).
 */
function ScrollArea({ style, contentContainerStyle, children, ...props }: ScrollAreaProps) {
  return (
    <ScrollView
      style={cn({ flex: 1 }, style)}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      {...props}
    >
      {children}
    </ScrollView>
  )
}

export { ScrollArea }
