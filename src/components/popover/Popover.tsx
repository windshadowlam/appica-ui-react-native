import * as React from 'react'
import { Modal, Pressable, View, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'

export interface PopoverProps {
  trigger: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** Vertical placement relative to the trigger. @default 'bottom' */
  side?: 'top' | 'bottom'
  style?: StyleProp<AnyStyle>
  children?: React.ReactNode
}

/**
 * Floating panel anchored via a Modal. Mirrors Appica's `popover`
 * (Popover + PopoverTrigger + PopoverContent).
 */
function Popover({ trigger, open, onOpenChange, side = 'bottom', style, children }: PopoverProps) {
  const theme = useTheme()
  const [internal, setInternal] = React.useState(false)
  const isOpen = open !== undefined ? open : internal
  const setOpen = (v: boolean) => {
    if (open === undefined) setInternal(v)
    onOpenChange?.(v)
  }

  return (
    <>
      <Pressable onPress={() => setOpen(!isOpen)}>{trigger}</Pressable>
      <Modal visible={isOpen} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: side === 'bottom' ? 'flex-start' : 'flex-end', paddingTop: side === 'bottom' ? 120 : 0 }} onPress={() => setOpen(false)}>
          <Pressable
            style={({ pressed }) =>
              cn(
                {
                  alignSelf: 'center',
                  backgroundColor: theme.colors.background,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: theme.colors['border-muted'],
                  padding: 14,
                  maxWidth: 320,
                  shadowColor: '#000',
                  shadowOpacity: 0.14,
                  shadowRadius: 16,
                  shadowOffset: { width: 0, height: 8 },
                  elevation: 8,
                  opacity: pressed ? 0.98 : 1,
                },
                style,
              )
            }
            onPress={(e) => e.stopPropagation()}
          >
            {children}
          </Pressable>
        </Pressable>
      </Modal>
    </>
  )
}

export { Popover }
