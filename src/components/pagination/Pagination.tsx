import * as React from 'react'
import { View, Pressable, Text, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'

export interface PaginationProps {
  page?: number
  totalPages: number
  onPageChange?: (page: number) => void
  /** Pages shown on each side of the current page. @default 1 */
  siblingCount?: number
  disabled?: boolean
  style?: StyleProp<AnyStyle>
}

function getRange(page: number, total: number, sibling: number): (number | 'ellipsis')[] {
  const totalNumbers = sibling * 2 + 5
  if (total <= totalNumbers) return Array.from({ length: total }, (_, i) => i + 1)
  const left = Math.max(page - sibling, 1)
  const right = Math.min(page + sibling, total)
  const out: (number | 'ellipsis')[] = [1]
  if (left > 2) out.push('ellipsis')
  for (let i = left; i <= right; i++) out.push(i)
  if (right < total - 1) out.push('ellipsis')
  out.push(total)
  return out
}

function Pagination({ page = 1, totalPages, onPageChange, siblingCount = 1, disabled, style }: PaginationProps) {
  const theme = useTheme()
  const range = getRange(page, totalPages, siblingCount)

  const cell = (active: boolean): AnyStyle => ({
    minWidth: 36,
    height: 36,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: active ? theme.colors.primary : theme.colors['border-strong'],
    backgroundColor: active ? theme.colors['primary-soft'] : theme.colors.background,
  })

  return (
    <View style={cn({ flexDirection: 'row', alignItems: 'center', gap: 4, alignSelf: 'flex-start' }, style)}>
      <Pressable
        disabled={disabled || page <= 1}
        onPress={() => onPageChange?.(page - 1)}
        style={({ pressed }) => cn(cell(false), { opacity: disabled || page <= 1 ? 0.4 : pressed ? 0.7 : 1 })}
      >
        <Text style={{ color: theme.colors['foreground-emphasis'] }}>‹</Text>
      </Pressable>
      {range.map((r, i) =>
        r === 'ellipsis' ? (
          <View key={`e${i}`} style={{ width: 36, height: 36, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: theme.colors['foreground-muted'] }}>…</Text>
          </View>
        ) : (
          <Pressable
            key={r}
            disabled={disabled}
            onPress={() => onPageChange?.(r)}
            style={({ pressed }) => cn(cell(r === page), { opacity: disabled ? 0.4 : pressed ? 0.7 : 1 })}
          >
            <Text style={{ color: r === page ? theme.colors['foreground-intense'] : theme.colors['foreground-emphasis'], fontWeight: r === page ? '600' : '500' }}>{r}</Text>
          </Pressable>
        ),
      )}
      <Pressable
        disabled={disabled || page >= totalPages}
        onPress={() => onPageChange?.(page + 1)}
        style={({ pressed }) => cn(cell(false), { opacity: disabled || page >= totalPages ? 0.4 : pressed ? 0.7 : 1 })}
      >
        <Text style={{ color: theme.colors['foreground-emphasis'] }}>›</Text>
      </Pressable>
    </View>
  )
}

export { Pagination }
