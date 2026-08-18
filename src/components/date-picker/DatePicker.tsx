import * as React from 'react'
import { Modal, Pressable, View, Text } from 'react-native'
import { useTheme } from '../../theme/theme'
import { Calendar } from '../calendar/Calendar'
import { Button } from '../button/Button'

export interface DatePickerProps {
  value?: Date
  defaultValue?: Date
  onChange?: (date: Date) => void
  min?: Date
  max?: Date
  placeholder?: string
}

function format(d: Date | undefined) {
  if (!d) return ''
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

/** Button that opens a `Calendar` in a Modal. Mirrors Appica's `date-picker`. */
function DatePicker({ value, defaultValue, onChange, min, max, placeholder = 'Pick a date' }: DatePickerProps) {
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const [draft, setDraft] = React.useState<Date | undefined>(value ?? defaultValue)

  const current = value !== undefined ? value : draft

  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        style={({ pressed }) => ({
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 40,
          paddingHorizontal: 14,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: theme.colors['border-strong'],
          backgroundColor: theme.colors.background,
          opacity: pressed ? 0.9 : 1,
        })}
      >
        <Text style={{ color: current ? theme.colors.foreground : theme.colors['foreground-subtle'], fontSize: 14 }}>{format(current) || placeholder}</Text>
        <Text style={{ color: theme.colors['foreground-muted'] }}>📅</Text>
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', alignItems: 'center', justifyContent: 'center', padding: 20 }} onPress={() => setOpen(false)}>
          <Pressable style={{ backgroundColor: theme.colors.background, borderRadius: 16, padding: 8 }} onPress={(e) => e.stopPropagation()}>
            <Calendar
              value={current}
              min={min}
              max={max}
              onValueChange={(d) => {
                if (value === undefined) setDraft(d)
                onChange?.(d)
                setOpen(false)
              }}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 8, gap: 8 }}>
              <Button variant="soft" size="sm" onPress={() => setOpen(false)}>
                Cancel
              </Button>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  )
}

export { DatePicker }
