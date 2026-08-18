import * as React from 'react'
import { Modal, Pressable, View, Text, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'

export interface TooltipProps {
  content: React.ReactNode
  /** Open on long-press instead of tap. @default false */
  longPress?: boolean
  style?: StyleProp<AnyStyle>
  children: React.ReactNode
}

/** Shows a small hint bubble. Mirrors Appica's `tooltip` (tap / long-press to reveal). */
function Tooltip({ content, longPress = false, style, children }: TooltipProps) {
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const triggerProps = longPress ? { onLongPress: () => setOpen(true) } : { onPress: () => setOpen(true) }

  return (
    <>
      <Pressable {...triggerProps}>{children}</Pressable>
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => setOpen(false)}>
          <View
            style={cn(
              {
                backgroundColor: theme.colors['background-inverse'],
                borderRadius: 8,
                paddingVertical: 6,
                paddingHorizontal: 10,
                maxWidth: 260,
              },
              style,
            )}
          >
            {typeof content === 'string' ? (
              <Text style={{ color: theme.colors['foreground-inverse'], fontSize: 12, lineHeight: 16 }}>{content}</Text>
            ) : (
              content
            )}
          </View>
        </Pressable>
      </Modal>
    </>
  )
}

export { Tooltip }
