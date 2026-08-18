import * as React from 'react'
import { Pressable, View, Text, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'

export interface ChipProps {
  selected?: boolean
  disabled?: boolean
  size?: 'sm' | 'md'
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  onPress?: () => void
  style?: StyleProp<AnyStyle>
  children?: React.ReactNode
}

/**
 * A compact, selectable tag. Mirrors Appica's `chip` — a toggleable pill used for
 * filters and multi-select. Renders as a static label when `onPress` is omitted.
 */
function Chip({
  selected = false,
  disabled = false,
  size = 'md',
  startIcon,
  endIcon,
  onPress,
  style,
  children,
}: ChipProps) {
  const theme = useTheme()
  const container: AnyStyle = {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: size === 'sm' ? 8 : 12,
    paddingVertical: size === 'sm' ? 3 : 5,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: selected ? theme.colors.primary : theme.colors['border-strong'],
    backgroundColor: selected ? theme.colors['primary-soft'] : theme.colors.background,
    opacity: disabled ? 0.5 : 1,
  }
  const labelColor = selected ? theme.colors['foreground-intense'] : theme.colors['foreground-emphasis']

  const content = (
    <>
      {startIcon ? <View>{startIcon}</View> : null}
      <Text style={{ color: labelColor, fontSize: size === 'sm' ? 12 : 13, fontWeight: '500' }}>{children}</Text>
      {endIcon ? <View>{endIcon}</View> : null}
    </>
  )

  if (!onPress) {
    return <View style={cn(container, style)}>{content}</View>
  }

  return (
    <Pressable disabled={disabled} onPress={onPress} style={({ pressed }) => cn(container, pressed && { opacity: 0.7 }, style)}>
      {content}
    </Pressable>
  )
}

export { Chip }
