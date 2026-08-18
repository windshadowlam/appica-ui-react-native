import * as React from 'react'
import { Modal, Pressable, View, Text, FlatList, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'
import { useControllableState } from '../../hooks/use-controllable-state'

export interface SelectOption {
  label: React.ReactNode
  value: string
  disabled?: boolean
}

export interface SelectProps {
  options: SelectOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  style?: StyleProp<AnyStyle>
}

const SIZE = { sm: { h: 32, fs: 12, pad: 12, r: 8 }, md: { h: 40, fs: 14, pad: 14, r: 10 }, lg: { h: 48, fs: 16, pad: 16, r: 12 } }

function Select({ options, value, defaultValue, onValueChange, placeholder = 'Select…', disabled, size = 'md', style }: SelectProps) {
  const theme = useTheme()
  const [val, setVal] = useControllableState<string>({ value, defaultValue, onChange: onValueChange })
  const [open, setOpen] = React.useState(false)
  const d = SIZE[size]
  const selected = options.find((o) => o.value === val)

  return (
    <>
      <Pressable
        disabled={disabled}
        onPress={() => setOpen(true)}
        style={({ pressed }) =>
          cn(
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: d.h,
              paddingHorizontal: d.pad,
              borderRadius: d.r,
              borderWidth: 1,
              borderColor: theme.colors['border-strong'],
              backgroundColor: theme.colors.background,
              opacity: disabled ? 0.5 : pressed ? 0.9 : 1,
            },
            style,
          )
        }
      >
        <Text style={{ color: selected ? theme.colors.foreground : theme.colors['foreground-subtle'], fontSize: d.fs }}>{selected ? selected.label : placeholder}</Text>
        <Text style={{ color: theme.colors['foreground-muted'] }}>⌄</Text>
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', padding: 24 }} onPress={() => setOpen(false)}>
          <Pressable style={{ backgroundColor: theme.colors.background, borderRadius: 14, maxHeight: '70%', padding: 6 }} onPress={(e) => e.stopPropagation()}>
            <FlatList
              data={options}
              keyExtractor={(o) => o.value}
              renderItem={({ item }) => (
                <Pressable
                  disabled={item.disabled}
                  onPress={() => { setVal(item.value); setOpen(false) }}
                  style={({ pressed }) => ({
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: 11,
                    paddingHorizontal: 14,
                    borderRadius: 8,
                    backgroundColor: item.value === val ? theme.colors['primary-soft'] : pressed ? theme.colors['background-muted'] : 'transparent',
                    opacity: item.disabled ? 0.4 : 1,
                  })}
                >
                  <Text style={{ color: item.value === val ? theme.colors['foreground-intense'] : theme.colors['foreground-emphasis'], fontSize: 14, fontWeight: item.value === val ? '600' : '400' }}>{item.label}</Text>
                  {item.value === val ? <Text style={{ color: theme.colors.primary, fontWeight: '700' }}>✓</Text> : null}
                </Pressable>
              )}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </>
  )
}

export { Select }
