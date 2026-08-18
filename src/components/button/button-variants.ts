import { cva } from '../../utils/cva'
import { radius, type AppicaColorTokens } from '../../theme/tokens-types'
import { type AnyStyle } from '../../utils/cn'

/**
 * Builds the Button variant resolver for the active color scheme.
 * Mirrors `@appica/ui-react/button/button-variants.ts`:
 *   8 variants (primary, primary-outline, secondary, soft, outline, ghost, destructive, light)
 *   6 sizes    (sm, md, lg, icon-sm, icon-md, icon-lg)
 */
export function makeButtonVariants(colors: AppicaColorTokens) {
  return cva<AnyStyle>(
    {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'flex-start',
      fontWeight: '500',
      overflow: 'hidden',
    } as AnyStyle,
    {
      variants: {
        variant: {
          primary: { backgroundColor: colors.primary, color: colors['primary-foreground'] },
          'primary-outline': {
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: colors.primary,
            color: colors.primary,
          },
          secondary: { backgroundColor: colors.secondary, color: colors['secondary-foreground'] },
          soft: { backgroundColor: colors['background-muted'], color: colors['foreground-emphasis'] },
          outline: {
            backgroundColor: colors.background,
            borderWidth: 1,
            borderColor: colors['border-strong'],
            color: colors['foreground-emphasis'],
          },
          ghost: { backgroundColor: 'transparent', color: colors['foreground-emphasis'] },
          destructive: { backgroundColor: colors.error, color: colors['error-foreground'] },
          light: {
            backgroundColor: 'rgba(255,255,255,0.10)',
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.10)',
            color: '#FFFFFF',
          },
        },
        size: {
          sm: { height: 32, paddingHorizontal: 16, borderRadius: radius.sm, gap: 4, fontSize: 12 },
          md: { height: 40, paddingHorizontal: 20, borderRadius: radius.md, gap: 6, fontSize: 14 },
          lg: { height: 48, paddingHorizontal: 24, borderRadius: radius.lg, gap: 8, fontSize: 16 },
          'icon-sm': { width: 32, height: 32, borderRadius: radius.sm },
          'icon-md': { width: 40, height: 40, borderRadius: radius.md },
          'icon-lg': { width: 48, height: 48, borderRadius: radius.lg },
        },
      },
      defaultVariants: { variant: 'primary', size: 'md' },
    },
  )
}
