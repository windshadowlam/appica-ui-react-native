import * as React from 'react'
import { View, Pressable, Text, FlatList, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'
import { Input } from '../input/Input'

export interface ComboboxItem {
  label: string
  value: string
}

export interface ComboboxProps {
  items: (string | ComboboxItem)[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  style?: StyleProp<AnyStyle>
}

function normalize(items: (string | ComboboxItem)[]): ComboboxItem[] {
  return items.map((i) => (typeof i === 'string' ? { label: i, value: i } : i))
}

/**
 * Typeahead select — an input that filters a list of options.
 * Mirrors Appica's `combobox` (and `autocomplete`).
 */
function Combobox({ items, value, onValueChange, placeholder = 'Search…', disabled, style }: ComboboxProps) {
  const theme = useTheme()
  const all = React.useMemo(() => normalize(items), [items])
  const [text, setText] = React.useState('')
  const [open, setOpen] = React.useState(false)

  const filtered = React.useMemo(() => {
    const q = text.trim().toLowerCase()
    if (!q) return all
    return all.filter((i) => i.label.toLowerCase().includes(q))
  }, [all, text])

  const select = (item: ComboboxItem) => {
    setText(item.label)
    onValueChange?.(item.value)
    setOpen(false)
  }

  return (
    <View style={cn({ position: 'relative', zIndex: open ? 50 : 0 }, style)}>
      <Input
        value={text}
        disabled={disabled}
        placeholder={placeholder}
        inputSize="md"
        onChangeText={(t) => {
          setText(t)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
      />
      {open && filtered.length > 0 ? (
        <View
          style={{
            position: 'absolute',
            top: 46,
            left: 0,
            right: 0,
            backgroundColor: theme.colors.background,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: theme.colors['border-muted'],
            maxHeight: 240,
            padding: 4,
            shadowColor: '#000',
            shadowOpacity: 0.12,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 6 },
            elevation: 6,
          }}
        >
          <FlatList
            data={filtered}
            keyExtractor={(i) => i.value}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => select(item)}
                style={({ pressed }) => ({ paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8, backgroundColor: pressed ? theme.colors['background-muted'] : 'transparent' })}
              >
                <Text style={{ color: theme.colors['foreground-emphasis'], fontSize: 14 }}>{item.label}</Text>
              </Pressable>
            )}
          />
        </View>
      ) : null}
    </View>
  )
}

export { Combobox }
