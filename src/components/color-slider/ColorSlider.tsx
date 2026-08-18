import * as React from 'react'
import { View, type StyleProp } from 'react-native'
import Slider from '@react-native-community/slider'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'

export interface ColorSliderProps {
  /** 0–1 position along the slider. */
  value: number
  onValueChange?: (value: number) => void
  /** Fixed hue for a solid track; omit for a rainbow hue track. */
  hue?: number
  height?: number
  style?: StyleProp<AnyStyle>
}

function hsl(h: number, s: number, l: number) {
  return `hsl(${h}, ${s * 100}%, ${l * 100}%)`
}

/** Draggable color slider (hue or solid track). Mirrors Appica's `color-slider`. */
function ColorSlider({ value, onValueChange, hue, height = 16, style }: ColorSliderProps) {
  const theme = useTheme()
  const stops = hue != null
    ? [hsl(hue, 1, 0.5)]
    : Array.from({ length: 16 }, (_, i) => hsl((i / 15) * 360, 1, 0.5))

  const thumbColor = hue != null ? hsl(hue, 1, 0.5) : hsl(value * 360, 1, 0.5)

  return (
    <View style={cn({ width: '100%', height, borderRadius: height / 2, overflow: 'hidden' }, style)}>
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, flexDirection: 'row' }}>
        {stops.map((c, i) => (
          <View key={i} style={{ flex: 1, backgroundColor: c }} />
        ))}
      </View>
      <Slider
        style={{ width: '100%', height: '100%' }}
        value={value}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="transparent"
        maximumTrackTintColor="transparent"
        thumbTintColor={thumbColor}
        onValueChange={onValueChange}
      />
    </View>
  )
}

export { ColorSlider }
