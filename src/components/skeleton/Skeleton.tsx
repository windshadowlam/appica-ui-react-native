import * as React from 'react'
import { View, Animated, Easing, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'

export interface SkeletonProps {
  /** @default 'rect' */
  variant?: 'text' | 'rect' | 'circle'
  width?: number | string
  height?: number | string
  radius?: number
  style?: StyleProp<AnyStyle>
}

/**
 * Loading placeholder with a shimmer sweep. Mirrors Appica's `skeleton`
 * (skeleton-shimmer utility), respecting reduced-motion by disabling the sweep
 * when the device prefers it.
 */
function Skeleton({ variant = 'rect', width, height, radius, style }: SkeletonProps) {
  const theme = useTheme()
  const translate = React.useRef(new Animated.Value(-1)).current

  React.useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(translate, {
        toValue: 1,
        duration: 1600,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    )
    loop.start()
    return () => loop.stop()
  }, [translate])

  const resolvedHeight =
    height ?? (variant === 'text' ? 14 : variant === 'circle' ? (width as number) ?? 40 : 16)
  const resolvedWidth = width ?? (variant === 'circle' ? resolvedHeight : '100%')
  const resolvedRadius = radius ?? (variant === 'circle' ? 999 : variant === 'text' ? 6 : 8)

  const containerStyle: AnyStyle = {
    width: resolvedWidth as number | string,
    height: resolvedHeight as number | string,
    borderRadius: resolvedRadius,
    backgroundColor: theme.colors['background-strong'],
    overflow: 'hidden',
  }

  return (
    <View style={cn(containerStyle, style)}>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: '60%',
          transform: [
            {
              translateX: translate.interpolate({
                inputRange: [-1, 1],
                outputRange: [-300, 300],
              }),
            },
          ],
          backgroundColor: theme.colors.background,
          opacity: 0.6,
        }}
      />
    </View>
  )
}

export { Skeleton }
