import * as React from 'react'
import { View, type StyleProp } from 'react-native'
import { cn, type AnyStyle } from '../../utils/cn'

export interface GradientGlowProps {
  color?: string
  /** Glow diameter (px). @default 280 */
  size?: number
  intensity?: number
  style?: StyleProp<AnyStyle>
}

/** Soft radial glow used behind hero content. Mirrors Appica's `gradient-glow`. */
function GradientGlow({ color = '#8b5cf6', size = 280, intensity = 0.35, style }: GradientGlowProps) {
  return (
    <View
      pointerEvents="none"
      style={cn(
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          opacity: intensity,
          position: 'absolute',
        },
        style,
      )}
    />
  )
}

export { GradientGlow }
