import * as React from 'react'
import { View, Animated, Easing, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'

export type ProgressColor = 'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'info'

export interface ProgressProps {
  /** 0–100. Ignored when `indeterminate`. */
  value?: number
  color?: ProgressColor
  /** Track height in px. @default 8 */
  size?: number
  indeterminate?: boolean
  style?: StyleProp<AnyStyle>
}

function Progress({ value = 0, color = 'primary', size = 8, indeterminate, style }: ProgressProps) {
  const theme = useTheme()
  const fillColor = theme.colors[color]

  if (indeterminate) {
    const x = React.useRef(new Animated.Value(0)).current
    React.useEffect(() => {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(x, { toValue: 1, duration: 1200, easing: Easing.inOut(Easing.ease), useNativeDriver: false }),
        ]),
      )
      loop.start()
      return () => loop.stop()
    }, [x])
    return (
      <View style={cn({ width: '100%' as unknown as number, height: size, borderRadius: size / 2, backgroundColor: theme.colors['background-strong'], overflow: 'hidden' }, style)}>
        <Animated.View
          style={{
            height: size,
            borderRadius: size / 2,
            backgroundColor: fillColor,
            width: '40%',
            transform: [
              {
                translateX: x.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-200, 500],
                }),
              },
            ],
          }}
        />
      </View>
    )
  }

  const pct = Math.max(0, Math.min(100, value)) / 100
  return (
    <View style={cn({ width: '100%' as unknown as number, height: size, borderRadius: size / 2, backgroundColor: theme.colors['background-strong'], overflow: 'hidden' }, style)}>
      <View style={{ height: size, width: `${pct * 100}%`, borderRadius: size / 2, backgroundColor: fillColor }} />
    </View>
  )
}

export { Progress }
