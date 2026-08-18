import * as React from 'react'
import { View, ScrollView, Pressable, Text, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'

export interface CarouselProps {
  /** Page nodes. */
  pages: React.ReactNode[]
  autoPlay?: boolean
  /** Autoplay interval in ms. @default 4000 */
  interval?: number
  showIndicators?: boolean
  style?: StyleProp<AnyStyle>
}

/** Paged, swipeable carousel with dot indicators. Mirrors Appica's `carousel`. */
function Carousel({ pages, autoPlay, interval = 4000, showIndicators = true, style }: CarouselProps) {
  const theme = useTheme()
  const [width, setWidth] = React.useState(0)
  const [index, setIndex] = React.useState(0)
  const ref = React.useRef<React.ElementRef<typeof ScrollView>>(null)

  React.useEffect(() => {
    if (!autoPlay || pages.length < 2) return
    const id = setInterval(() => {
      const next = (index + 1) % pages.length
      ;(ref.current as any)?.scrollTo?.({ x: next * width, animated: true })
      setIndex(next)
    }, interval)
    return () => clearInterval(id)
  }, [autoPlay, interval, index, pages.length, width])

  return (
    <View style={cn({ borderRadius: 12, overflow: 'hidden' }, style)}>
      <ScrollView
        ref={ref}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
        onMomentumScrollEnd={(e) => {
          const i = Math.round(e.nativeEvent.contentOffset.x / (width || 1))
          setIndex(i)
        }}
      >
        {pages.map((p, i) => (
          <View key={i} style={{ width, flex: width ? 0 : 1 }}>
            {p}
          </View>
        ))}
      </ScrollView>
      {showIndicators && pages.length > 1 ? (
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 6, paddingVertical: 8 }}>
          {pages.map((_, i) => (
            <Pressable key={i} onPress={() => { (ref.current as any)?.scrollTo?.({ x: i * width, animated: true }); setIndex(i) }}>
              <View style={{ width: i === index ? 20 : 8, height: 8, borderRadius: 4, backgroundColor: i === index ? theme.colors.primary : theme.colors['border-intense'] }} />
            </Pressable>
          ))}
        </View>
      ) : null}
    </View>
  )
}

export { Carousel }
