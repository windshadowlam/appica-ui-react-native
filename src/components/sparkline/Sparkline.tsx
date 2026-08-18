import * as React from 'react'
import { View, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'

export interface SparklineProps {
  data: number[]
  width?: number
  height?: number
  color?: string
  /** Fill the area under the line. @default false */
  fill?: boolean
  strokeWidth?: number
  style?: StyleProp<AnyStyle>
}

/**
 * Tiny trend line drawn with Views (no SVG dependency). Mirrors Appica's
 * `sparkline`. Segments rotate around their own midpoint so endpoints meet.
 */
function Sparkline({ data, width = 120, height = 36, color, fill, strokeWidth = 2, style }: SparklineProps) {
  const theme = useTheme()
  const stroke = color ?? theme.colors.primary
  if (data.length < 2) return <View style={cn({ width, height }, style)} />

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const pad = strokeWidth

  const points = data.map((v, i) => ({
    x: (i / (data.length - 1)) * width,
    y: pad + (1 - (v - min) / range) * (height - pad * 2),
  }))

  const segments: React.ReactNode[] = []
  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i]
    const p2 = points[i + 1]
    const dx = p2.x - p1.x
    const dy = p2.y - p1.y
    const len = Math.sqrt(dx * dx + dy * dy)
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI
    const mx = (p1.x + p2.x) / 2
    const my = (p1.y + p2.y) / 2
    segments.push(
      <View
        key={i}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: len,
          height: strokeWidth,
          borderRadius: strokeWidth,
          backgroundColor: stroke,
          transform: [{ translateX: mx - len / 2 }, { translateY: my - strokeWidth / 2 }, { rotate: `${angle}deg` }],
        }}
      />,
    )
  }

  return (
    <View style={cn({ width, height }, style)}>
      {fill ? (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: height - points[0].y,
            backgroundColor: stroke,
            opacity: 0.12,
          }}
        />
      ) : null}
      {segments}
      {points.map((p, i) => (
        <View key={`d${i}`} style={{ position: 'absolute', left: p.x - strokeWidth, top: p.y - strokeWidth, width: strokeWidth * 2, height: strokeWidth * 2, borderRadius: strokeWidth, backgroundColor: stroke }} />
      ))}
    </View>
  )
}

export { Sparkline }
