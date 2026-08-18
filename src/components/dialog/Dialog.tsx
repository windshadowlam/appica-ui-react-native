import * as React from 'react'
import { Modal, Pressable, View, Text, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'

export interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Close when the backdrop is pressed. @default true */
  dismissOnBackdrop?: boolean
  style?: StyleProp<AnyStyle>
  children?: React.ReactNode
}

/**
 * Modal dialog. Mirrors Appica's `dialog` (Root + Overlay + Content): the Modal
 * + dimmed backdrop live here; place a `DialogContent` (or any node) inside.
 */
function Dialog({ open, onOpenChange, dismissOnBackdrop = true, style, children }: DialogProps) {
  const theme = useTheme()
  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={() => onOpenChange(false)}>
      <Pressable
        style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', alignItems: 'center', justifyContent: 'center', padding: 20 }}
        onPress={() => dismissOnBackdrop && onOpenChange(false)}
      >
        <Pressable style={({ pressed }) => cn({ backgroundColor: theme.colors.background, borderRadius: 16, width: '100%', maxWidth: 480, padding: 20, opacity: pressed ? 0.98 : 1 }, style)} onPress={(e) => e.stopPropagation()}>
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  )
}

export interface DialogContentProps {
  style?: StyleProp<AnyStyle>
  children?: React.ReactNode
}

function DialogContent({ style, children }: DialogContentProps) {
  return <View style={cn(style)}>{children}</View>
}

function DialogTitle({ style, children }: { style?: StyleProp<AnyStyle>; children?: React.ReactNode }) {
  const theme = useTheme()
  return <Text style={cn({ color: theme.colors['foreground-intense'], fontSize: 18, fontWeight: '600', marginBottom: 8 }, style as AnyStyle)}>{children}</Text>
}

function DialogDescription({ style, children }: { style?: StyleProp<AnyStyle>; children?: React.ReactNode }) {
  const theme = useTheme()
  return <Text style={cn({ color: theme.colors['foreground-muted'], fontSize: 14, lineHeight: 20, marginBottom: 16 }, style as AnyStyle)}>{children}</Text>
}

export { Dialog, DialogContent, DialogTitle, DialogDescription }
