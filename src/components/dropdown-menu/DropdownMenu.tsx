import * as React from 'react'
import { Modal, Pressable, View, Text, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'

export interface MenuItem {
  label?: React.ReactNode
  onSelect?: () => void
  icon?: React.ReactNode
  disabled?: boolean
  destructive?: boolean
  /** Render a separator instead of an item. */
  separator?: boolean
}

export interface DropdownMenuProps {
  trigger: React.ReactNode
  items: MenuItem[]
  style?: StyleProp<AnyStyle>
}

function MenuCard({ items, onClose, style }: { items: MenuItem[]; onClose: () => void; style?: StyleProp<AnyStyle> }) {
  const theme = useTheme()
  return (
    <Pressable
      style={cn(
        {
          backgroundColor: theme.colors.background,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: theme.colors['border-muted'],
          padding: 4,
          minWidth: 180,
          shadowColor: '#000',
          shadowOpacity: 0.14,
          shadowRadius: 16,
          shadowOffset: { width: 0, height: 8 },
          elevation: 8,
        },
        style,
      )}
      onPress={(e) => e.stopPropagation()}
    >
      {items.map((item, i) =>
        item.separator ? (
          <View key={i} style={{ height: 1, backgroundColor: theme.colors['border-muted'], marginVertical: 4 }} />
        ) : (
          <Pressable
            key={i}
            disabled={item.disabled}
            onPress={() => { item.onSelect?.(); onClose() }}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              paddingVertical: 9,
              paddingHorizontal: 12,
              borderRadius: 8,
              backgroundColor: pressed ? theme.colors['background-muted'] : 'transparent',
              opacity: item.disabled ? 0.4 : 1,
            })}
          >
            {item.icon ? <View>{item.icon}</View> : null}
            <Text style={{ color: item.destructive ? theme.colors.error : theme.colors['foreground-emphasis'], fontSize: 14, fontWeight: '500', flex: 1 }}>{item.label}</Text>
          </Pressable>
        ),
      )}
    </Pressable>
  )
}

function DropdownMenu({ trigger, items, style }: DropdownMenuProps) {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Pressable onPress={() => setOpen(true)}>{trigger}</Pressable>
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'flex-start', paddingTop: 80, alignItems: 'flex-end', paddingHorizontal: 16 }} onPress={() => setOpen(false)}>
          <MenuCard items={items} onClose={() => setOpen(false)} style={style} />
        </Pressable>
      </Modal>
    </>
  )
}

export { DropdownMenu, MenuCard }
