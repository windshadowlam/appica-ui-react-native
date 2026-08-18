// Type helpers derived from the generated token file. Imported by components so
// variant factories stay fully typed against the real color token names.
import {
  lightColors,
  darkColors,
  radius,
  spacing,
  fontSizes,
  shadows,
} from './tokens'

export type AppicaColorTokens = typeof lightColors
export type AppicaColorName = keyof AppicaColorTokens

export { lightColors, darkColors, radius, spacing, fontSizes, shadows }
