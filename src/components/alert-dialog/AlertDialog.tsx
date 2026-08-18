import * as React from 'react'
import { Modal, Pressable, View, Text, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'
import { Button } from '../button/Button'

export interface AlertDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: React.ReactNode
  description?: React.ReactNode
  confirmLabel?: string
  cancelLabel?: string
  destructive?: boolean
  onConfirm?: () => void
  style?: StyleProp<AnyStyle>
}

/** Confirmation dialog with action/cancel. Mirrors Appica's `alert-dialog`. */
function AlertDialog({
  open,
  onOpenChange,
  title = 'Are you sure?',
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  destructive,
  onConfirm,
  style,
}: AlertDialogProps) {
  const theme = useTheme()
  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={() => onOpenChange(false)}>
      <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', alignItems: 'center', justifyContent: 'center', padding: 20 }} onPress={() => onOpenChange(false)}>
        <Pressable
          style={({ pressed }) => cn({ backgroundColor: theme.colors.background, borderRadius: 16, width: '100%', maxWidth: 420, padding: 20, opacity: pressed ? 0.98 : 1 }, style)}
          onPress={(e) => e.stopPropagation()}
        >
          <Text style={{ color: theme.colors['foreground-intense'], fontSize: 18, fontWeight: '600', marginBottom: 8 }}>{title}</Text>
          {description != null ? (
            typeof description === 'string' ? (
              <Text style={{ color: theme.colors['foreground-muted'], fontSize: 14, lineHeight: 20, marginBottom: 16 }}>{description}</Text>
            ) : (
              description
            )
          ) : null}
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 8 }}>
            <Button variant="soft" onPress={() => onOpenChange(false)}>
              {cancelLabel}
            </Button>
            <Button variant={destructive ? 'destructive' : 'primary'} onPress={() => { onConfirm?.(); onOpenChange(false) }}>
              {confirmLabel}
            </Button>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  )
}

export { AlertDialog }
