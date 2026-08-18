import * as React from 'react'
import { View, Animated, Easing, type StyleProp } from 'react-native'
import { cn, type AnyStyle } from '../../utils/cn'

export interface BorderBeamProps {
  /** Beam thickness (px). @default 2 */
  thickness?: number
  /** Rotation duration in ms. @default 6000 */
  duration?: number
  colorFrom?: string
  colorTo?: string
  radius?: number
  style?: StyleProp<AnyStyle>
  children?: React.ReactNode
}

/**
 * Animated rotating gradient border. Mirrors Appica's `border-beam`.
 * Approximates the gradient sweep with a rotating two-tone bar masked by the
 * inner content panel (RN has no native conic-gradient).
 */
function BorderBeam({ thickness = 2, duration = 6000, colorFrom = '#8b5cf6', colorTo = '#ec4899', radius = 16, style, children }: BorderBeamProps) {
  const spin = React.useRef(new Animated.Value(0)).current
  React.useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(spin, { toValue: 1, duration, easing: Easing.linear, useNativeDriver: true }),
    )
    loop.start()
    return () => loop.stop()
  }, [spin, duration])

  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] })

  return (
    <View style={cn({ borderRadius: radius, overflow: 'hidden' }, style)}>
      <Animated.View
        style={{
          position: 'absolute',
          width: 200,
          height: 200,
          top: '50%',
          left: '50%',
          marginLeft: -100,
          marginTop: -100,
          borderRadius: 100,
          borderWidth: 60,
          borderColor: colorFrom,
          borderTopColor: colorTo,
          borderRightColor: colorTo,
          transform: [{ rotate }],
        }}
      />
      <View style={{ margin: thickness, borderRadius: radius - thickness, overflow: 'hidden', backgroundColor: 'transparent' }}>{children}</View>
    </View>
  )
}

export { BorderBeam }
