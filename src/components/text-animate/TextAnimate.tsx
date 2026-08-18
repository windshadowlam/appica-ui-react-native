import * as React from 'react'
import { Text, Animated, Easing, type StyleProp } from 'react-native'
import { cn, type AnyStyle } from '../../utils/cn'

export interface TextAnimateProps {
  text: string
  /** @default 'fade' */
  variant?: 'fade' | 'blur' | 'slide-up'
  delay?: number
  duration?: number
  style?: StyleProp<AnyStyle>
}

/** Animates text into view on mount. Mirrors Appica's `text-animate`. */
function TextAnimate({ text, variant = 'fade', delay = 0, duration = 500, style }: TextAnimateProps) {
  const opacity = React.useRef(new Animated.Value(0)).current
  const translate = React.useRef(new Animated.Value(variant === 'slide-up' ? 12 : 0)).current

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration, delay, easing: Easing.out(Easing.ease), useNativeDriver: true }),
      Animated.timing(translate, { toValue: 0, duration, delay, easing: Easing.out(Easing.ease), useNativeDriver: true }),
    ]).start()
  }, [opacity, translate, duration, delay])

  return (
    <Animated.Text
      style={cn(
        {
          opacity,
          transform: [{ translateY: translate }],
        },
        style as AnyStyle,
      )}
    >
      {text}
    </Animated.Text>
  )
}

export { TextAnimate }
