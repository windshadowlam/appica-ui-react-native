import * as React from 'react'
import { View, PanResponder, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'

export interface ColorAreaValue {
  /** 0–1 left→right. */
  saturation: number
  /** 0–1 bottom→top. */
  value: number
}

export interface ColorAreaProps {
  hue: number
  value?: ColorAreaValue
  defaultValue?: ColorAreaValue
  onValueChange?: (value: ColorAreaValue) => void
  size?: number
  style?: StyleProp<AnyStyle>
}

function hsl(h: number, s: number, l: number) {
  return `hsl(${h}, ${s * 100}%, ${l * 100}%)`
}

/**
 * 2D saturation/value pad. Mirrors Appica's `color-area`. Note: React Native
 * lacks native gradients, so the SV square is approximated with translucent
 * white/black overlays over the hue background.
 */
function ColorArea({ hue, value, defaultValue, onValueChange, size = 200, style }: ColorAreaProps) {
  const theme = useTheme()
  const [internal, setInternal] = React.useState<ColorAreaValue>(defaultValue ?? { saturation: 1, value: 1 })
  const current = value !== undefined ? value : internal
  const layout = React.useRef({ w: size, h: size })

  const update = (sx: number, sy: number) => {
    const s = Math.max(0, Math.min(1, sx / layout.current.w))
    const v = Math.max(0, Math.min(1, 1 - sy / layout.current.h))
    const next = { saturation: s, value: v }
    if (value === undefined) setInternal(next)
    onValueChange?.(next)
  }

  const pan = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e) => {
        const { locationX, locationY } = e.nativeEvent
        update(locationX, locationY)
      },
      onPanResponderGrant: (e) => {
        const { locationX, locationY } = e.nativeEvent
        update(locationX, locationY)
      },
    }),
  ).current

  const thumbX = current.saturation * layout.current.w
  const thumbY = (1 - current.value) * layout.current.h

  return (
    <View
      onLayout={(e) => {
        layout.current = { w: e.nativeEvent.layout.width, h: e.nativeEvent.layout.height }
      }}
      {...pan.panHandlers}
      style={cn({ width: size, height: size, borderRadius: 12, overflow: 'hidden', alignSelf: 'flex-start' }, style)}
    >
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: hsl(hue, 1, 0.5) }} />
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#fff', opacity: 0.5 }} />
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '55%', backgroundColor: '#000', opacity: 0.55 }} />
      <View style={{ position: 'absolute', width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: '#fff', backgroundColor: 'transparent', left: thumbX - 9, top: thumbY - 9, shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 3 }} />
    </View>
  )
}

export { ColorArea }
