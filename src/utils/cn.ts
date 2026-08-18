import { type StyleProp, type ViewStyle, type TextStyle } from 'react-native'

/** React Native style union used throughout the library. */
export type AnyStyle = ViewStyle | TextStyle

/**
 * Flatten and merge React Native styles the way Appica's `cn` (clsx + tailwind-merge)
 * merges class names. Accepts style objects, arrays, or falsy values and returns a
 * single `StyleProp` array ready to pass to a component's `style` prop.
 *
 *   style={cn(buttonVariants({ variant, size }), props.style, pressed && styles.pressed)}
 */
export function cn(
  ...inputs: (StyleProp<AnyStyle> | false | null | undefined)[]
): StyleProp<AnyStyle> {
  const out: AnyStyle[] = []
  for (const input of inputs) {
    if (!input) continue
    if (Array.isArray(input)) {
      for (const item of input) {
        if (item) out.push(item as AnyStyle)
      }
    } else if (typeof input === 'object') {
      out.push(input as AnyStyle)
    }
  }
  return out
}
