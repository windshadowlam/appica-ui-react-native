import * as React from 'react'
import { useColorScheme as useSystemColorScheme } from 'react-native'
import {
  lightColors,
  darkColors,
  radius,
  spacing,
  fontSizes,
  shadows,
  fontFamily,
} from './tokens'

export type ColorScheme = 'light' | 'dark'

export interface AppicaTheme {
  colorScheme: ColorScheme
  /** Resolved color tokens for the active scheme. */
  colors: typeof lightColors
  radius: typeof radius
  spacing: typeof spacing
  fontSizes: typeof fontSizes
  shadows: typeof shadows
  fontFamily: typeof fontFamily
  /** Horizontal text direction, mirrors Appica's DirectionProvider (RTL support). */
  direction: 'ltr' | 'rtl'
}

const ThemeContext = React.createContext<AppicaTheme | null>(null)

export interface ThemeProviderProps {
  children: React.ReactNode
  /** Force a scheme; omit to follow the device color scheme. */
  colorScheme?: ColorScheme
  /** Text direction. @default 'ltr' */
  direction?: 'ltr' | 'rtl'
}

function buildTheme(scheme: ColorScheme, direction: 'ltr' | 'rtl'): AppicaTheme {
  return {
    colorScheme: scheme,
    colors: scheme === 'dark' ? darkColors : lightColors,
    radius,
    spacing,
    fontSizes,
    shadows,
    fontFamily,
    direction,
  }
}

export function ThemeProvider({ children, colorScheme, direction = 'ltr' }: ThemeProviderProps) {
  const system = useSystemColorScheme()
  const scheme: ColorScheme = colorScheme ?? (system === 'dark' ? 'dark' : 'light')
  const theme = React.useMemo(() => buildTheme(scheme, direction), [scheme, direction])
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

/** Access the active Appica theme (colors, radius, spacing, typography). */
export function useTheme(): AppicaTheme {
  const ctx = React.useContext(ThemeContext)
  if (!ctx) {
    // Graceful fallback so components work without an explicit provider.
    return buildTheme('light', 'ltr')
  }
  return ctx
}

/** Convenience selector for a color token. */
export function useColor(token: keyof typeof lightColors): string {
  return useTheme().colors[token]
}
