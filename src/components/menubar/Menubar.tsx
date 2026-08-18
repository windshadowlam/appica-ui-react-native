import * as React from 'react'
import { View, type StyleProp } from 'react-native'
import { DropdownMenu, type MenuItem } from '../dropdown-menu/DropdownMenu'
import { Button } from '../button/Button'
import { cn, type AnyStyle } from '../../utils/cn'

export interface MenubarMenu {
  label: React.ReactNode
  items: MenuItem[]
}

export interface MenubarProps {
  menus: MenubarMenu[]
  style?: StyleProp<AnyStyle>
}

/** Horizontal menu bar of dropdown menus. Mirrors Appica's `menubar`. */
function Menubar({ menus, style }: MenubarProps) {
  return (
    <View style={cn({ flexDirection: 'row', alignItems: 'center', gap: 2 }, style)}>
      {menus.map((m, i) => (
        <DropdownMenu
          key={i}
          items={m.items}
          trigger={
            <Button variant="ghost" size="sm">
              {m.label}
            </Button>
          }
        />
      ))}
    </View>
  )
}

export { Menubar }
