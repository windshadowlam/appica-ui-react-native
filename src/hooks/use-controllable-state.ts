import * as React from 'react'

/**
 * Controlled / uncontrolled state helper used by interactive Appica components
 * (Switch, Checkbox, Tabs, Accordion, Select, …). Mirrors the pattern in the
 * web library where a component accepts both `value`/`defaultValue` and `onValueChange`.
 */
export function useControllableState<T>(params: {
  value?: T
  defaultValue?: T
  onChange?: (value: T) => void
}): [T, (next: T | ((prev: T) => T)) => void] {
  const { value, defaultValue, onChange } = params
  const isControlled = value !== undefined
  const [internal, setInternal] = React.useState<T>(defaultValue as T)
  const current = isControlled ? (value as T) : internal

  const setValue = React.useCallback(
    (next: T | ((prev: T) => T)) => {
      const resolved =
        typeof next === 'function' ? (next as (prev: T) => T)(current) : next
      if (!isControlled) setInternal(resolved)
      if (resolved !== current) onChange?.(resolved)
    },
    [current, isControlled, onChange],
  )

  return [current, setValue]
}
