import * as React from 'react'
import { Pressable, View, Animated, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'
import { useControllableState } from '../../hooks/use-controllable-state'

export interface SwitchProps {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  size?: 'sm' | 'md'
  style?: StyleProp<AnyStyle>
}

function Switch({ checked, defaultChecked, onCheckedChange, disabled, size = 'md', style }: SwitchProps) {
  const theme = useTheme()
  const [value, setValue] = useControllableState<boolean>({
    value: checked,
    defaultValue: defaultChecked ?? false,
    onChange: onCheckedChange,
  })

  const dims = size === 'sm' ? { w: 36, h: 20, pad: 2, thumb: 16 } : { w: 44, h: 24, pad: 2, thumb: 20 }
  const thumbX = React.useRef(new Animated.Value(value ? 1 : 0)).current

  React.useEffect(() => {
    Animated.timing(thumbX, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start()
  }, [value, thumbX])

  const trackStyle: AnyStyle = {
    width: dims.w,
    height: dims.h,
    borderRadius: dims.h / 2,
    padding: dims.pad,
    backgroundColor: value ? theme.colors.primary : theme.colors['background-strong'],
    opacity: disabled ? 0.5 : 1,
    justifyContent: 'center',
  }

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      disabled={disabled}
      onPress={() => setValue(!value)}
      style={({ pressed }) => cn(trackStyle, pressed && { opacity: 0.8 }, style)}
    >
      <Animated.View
        style={{
          width: dims.thumb,
          height: dims.thumb,
          borderRadius: dims.thumb / 2,
          backgroundColor: theme.colors['primary-foreground'],
          transform: [
            {
              translateX: thumbX.interpolate({
                inputRange: [0, 1],
                outputRange: [0, dims.w - dims.thumb - dims.pad * 2],
              }),
            },
          ],
        }}
      />
    </Pressable>
  )
}

export { Switch }
