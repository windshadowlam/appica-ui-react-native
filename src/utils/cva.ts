import { type AnyStyle } from './cn'

/**
 * React Native port of `class-variance-authority`.
 *
 * Appica's web components call `buttonVariants({ variant, size })`, which returns an
 * array of Tailwind classes. Here the same API returns an array of React Native
 * style objects, so component code stays structurally identical to the source:
 *
 *   const buttonVariants = cva(base, { variants: { variant: {...}, size: {...} } })
 *   style={cn(buttonVariants({ variant, size }), props.style)}
 */
export type VariantValue<S extends AnyStyle = AnyStyle> = S | ((props: Record<string, unknown>) => S)
export type Variants<S extends AnyStyle = AnyStyle> = Record<string, Record<string, VariantValue<S>>>
export type VariantProps = Record<string, string | undefined>

export interface CompoundVariant<S extends AnyStyle = AnyStyle> {
  style?: VariantValue<S>
  [key: string]: string | boolean | undefined | VariantValue<S>
}

export interface CvaConfig<S extends AnyStyle = AnyStyle> {
  base?: VariantValue<S>
  variants?: Variants<S>
  defaultVariants?: Record<string, string>
  compoundVariants?: CompoundVariant<S>[]
}

function resolve<S extends AnyStyle>(value: VariantValue<S>, props: VariantProps): S {
  return typeof value === 'function' ? (value as (p: VariantProps) => S)(props) : value
}

export function cva<S extends AnyStyle = AnyStyle>(base: VariantValue<S> | undefined, config: CvaConfig<S>) {
  return (props: VariantProps = {}): S[] => {
    const styles: S[] = []
    const defaults = config.defaultVariants ?? {}

    if (base) styles.push(resolve(base, props))

    const variants = config.variants ?? {}
    for (const key of Object.keys(variants)) {
      const selected = props[key] ?? defaults[key]
      if (selected == null) continue
      const variantMap = variants[key]
      const styleValue = variantMap[selected]
      if (styleValue) styles.push(resolve(styleValue, props))
    }

    for (const cv of config.compoundVariants ?? []) {
      let matches = true
      for (const key of Object.keys(cv)) {
        if (key === 'style') continue
        if ((props[key] ?? defaults[key]) !== cv[key]) {
          matches = false
          break
        }
      }
      if (matches && cv.style) styles.push(resolve(cv.style, props))
    }

    return styles
  }
}

/** Extract variant prop types so components can extend them, matching Appica. */
export type VariantPropsOf<T extends (props: any) => any> = Parameters<T>[0]
