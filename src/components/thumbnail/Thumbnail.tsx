import * as React from 'react'
import { View, Image, type StyleProp, type ImageSourcePropType, type DimensionValue } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'

export interface ThumbnailProps {
  source: ImageSourcePropType
  width?: DimensionValue
  height?: DimensionValue
  radius?: number
  /** Overlay rendered on top of the image (badges, play button, …). */
  overlay?: React.ReactNode
  style?: StyleProp<AnyStyle>
}

/** Circular or rounded image thumbnail. Mirrors Appica's `thumbnail`. */
function Thumbnail({ source, width = 80, height = 80, radius = 12, overlay, style }: ThumbnailProps) {
  const theme = useTheme()
  return (
    <View style={cn({ width, height, borderRadius: radius, overflow: 'hidden', backgroundColor: theme.colors['background-muted'], position: 'relative' }, style)}>
      <Image source={source} style={{ width: '100%', height: '100%' }} />
      {overlay ? <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>{overlay}</View> : null}
    </View>
  )
}

export { Thumbnail }
