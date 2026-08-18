import * as React from 'react'
import { View, Pressable, Text, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'

export interface CalendarProps {
  value?: Date
  defaultValue?: Date
  onValueChange?: (date: Date) => void
  min?: Date
  max?: Date
  style?: StyleProp<AnyStyle>
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}
function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

/** Month grid date picker. Mirrors Appica's `calendar`. */
function Calendar({ value, defaultValue, onValueChange, min, max, style }: CalendarProps) {
  const theme = useTheme()
  const [selected, setSelected] = React.useState<Date | undefined>(value ?? defaultValue)
  const today = startOfDay(new Date())
  const [view, setView] = React.useState(() => selected ?? today)
  const current = value !== undefined ? value : selected

  const year = view.getFullYear()
  const month = view.getMonth()
  const firstWeekday = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells: (Date | null)[] = []
  for (let i = 0; i < firstWeekday; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))
  while (cells.length % 7 !== 0) cells.push(null)

  const select = (d: Date) => {
    if (min && d < startOfDay(min)) return
    if (max && d > startOfDay(max)) return
    if (value === undefined) setSelected(d)
    onValueChange?.(d)
  }

  return (
    <View style={cn({ width: 308, padding: 12, borderRadius: 14, backgroundColor: theme.colors.background }, style)}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <Pressable onPress={() => setView(new Date(year, month - 1, 1))} style={({ pressed }) => ({ padding: 6, opacity: pressed ? 0.6 : 1 })}>
          <Text style={{ color: theme.colors['foreground-emphasis'], fontSize: 16 }}>‹</Text>
        </Pressable>
        <Text style={{ color: theme.colors['foreground-intense'], fontSize: 14, fontWeight: '600' }}>{MONTHS[month]} {year}</Text>
        <Pressable onPress={() => setView(new Date(year, month + 1, 1))} style={({ pressed }) => ({ padding: 6, opacity: pressed ? 0.6 : 1 })}>
          <Text style={{ color: theme.colors['foreground-emphasis'], fontSize: 16 }}>›</Text>
        </Pressable>
      </View>

      <View style={{ flexDirection: 'row', marginBottom: 4 }}>
        {WEEKDAYS.map((w) => (
          <View key={w} style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ color: theme.colors['foreground-muted'], fontSize: 11, fontWeight: '600' }}>{w}</Text>
          </View>
        ))}
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {cells.map((d, i) => {
          if (!d) return <View key={i} style={{ width: '14.285%' as unknown as number, aspectRatio: 1 }} />
          const isSelected = current && sameDay(d, current)
          const isToday = sameDay(d, today)
          const disabled = (min && d < startOfDay(min)) || (max && d > startOfDay(max))
          return (
            <View key={i} style={{ width: '14.285%' as unknown as number, aspectRatio: 1, padding: 2 }}>
              <Pressable
                disabled={disabled}
                onPress={() => select(d)}
                style={({ pressed }) => ({
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                  backgroundColor: isSelected ? theme.colors.primary : pressed ? theme.colors['background-muted'] : 'transparent',
                  borderWidth: isToday && !isSelected ? 1 : 0,
                  borderColor: theme.colors['border-intense'],
                  opacity: disabled ? 0.3 : 1,
                })}
              >
                <Text style={{ color: isSelected ? theme.colors['primary-foreground'] : theme.colors['foreground-emphasis'], fontSize: 13, fontWeight: isSelected ? '600' : '400' }}>
                  {d.getDate()}
                </Text>
              </Pressable>
            </View>
          )
        })}
      </View>
    </View>
  )
}

export { Calendar }
