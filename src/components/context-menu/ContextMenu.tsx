import * as React from 'react'
import { Modal, Pressable, View, type StyleProp } from 'react-native'
import { MenuCard, type MenuItem } from '../dropdown-menu/DropdownMenu'
import { type AnyStyle } from '../../utils/cn'

export interface ContextMenuProps {
  /** The element that opens the menu on long-press. */
  children: React.ReactNode
  items: MenuItem[]
  style?: StyleProp<AnyStyle>
}

/** Opens a menu on long-press. Mirrors Appica's `context-menu`. */
function ContextMenu({ children, items, style }: ContextMenuProps) {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Pressable onLongPress={() => setOpen(true)}>{children}</Pressable>
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.35)' }} onPress={() => setOpen(false)}>
          <View style={{ marginTop: '40%', marginHorizontal: 24 }}>
            <Pressable onPress={(e) => e.stopPropagation()}>
              <MenuCard items={items} onClose={() => setOpen(false)} style={style} />
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  )
}

export { ContextMenu }
