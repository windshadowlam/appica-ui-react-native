import * as React from 'react'
import { Modal, Pressable, View, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'

export type DrawerSide = 'left' | 'right' | 'top' | 'bottom'

export interface DrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  side?: DrawerSide
  /** Width (for left/right) or height (for top/bottom) in px. */
  size?: number
  dismissOnBackdrop?: boolean
  style?: StyleProp<AnyStyle>
  children?: React.ReactNode
}

/** Side panel that slides in. Mirrors Appica's `drawer` (sheet). */
function Drawer({ open, onOpenChange, side = 'right', size = 320, dismissOnBackdrop = true, style, children }: DrawerProps) {
  const theme = useTheme()
  const horizontal = side === 'left' || side === 'right'

  const panel: AnyStyle = {
    position: 'absolute',
    backgroundColor: theme.colors.background,
    ...(horizontal
      ? { top: 0, bottom: 0, width: size, [side]: 0 }
      : { left: 0, right: 0, height: size, [side]: 0 }),
    borderWidth: 1,
    borderColor: theme.colors['border-muted'],
    ...(side === 'left' ? { borderLeftWidth: 0 } : side === 'right' ? { borderRightWidth: 0 } : side === 'top' ? { borderTopWidth: 0 } : { borderBottomWidth: 0 }),
  }

  return (
    <Modal visible={open} transparent animationType="slide" onRequestClose={() => onOpenChange(false)}>
      <Pressable
        style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.45)' }}
        onPress={() => dismissOnBackdrop && onOpenChange(false)}
      >
        <View style={cn(panel, style)}>{children}</View>
      </Pressable>
    </Modal>
  )
}

export { Drawer }
