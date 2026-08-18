import * as React from 'react'
import { Slider as RNSlider, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'
import { useControllableState } from '../../hooks/use-controllable-state'

export interface SliderProps {
  value?: number
  defaultValue?: number
  onValueChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  color?: string
  style?: StyleProp<AnyStyle>
}

function Slider({ value, defaultValue = 0, onValueChange, min = 0, max = 100, step = 1, disabled, color, style }: SliderProps) {
  const theme = useTheme()
  const [val, setVal] = useControllableState<number>({
    value,
    defaultValue,
    onChange: onValueChange,
  })
  return (
    <RNSlider
      style={cn({ width: '100%' as unknown as number }, style)}
      value={val}
      minimumValue={min}
      maximumValue={max}
      step={step}
      disabled={disabled}
      minimumTrackTintColor={color ?? theme.colors.primary}
      maximumTrackTintColor={theme.colors['background-strong']}
      thumbTintColor={color ?? theme.colors.primary}
      onValueChange={(v) => setVal(v)}
    />
  )
}

export { Slider }
