import * as React from 'react'
import { View, Text, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'

export interface CountdownProps {
  /** Target date (Date or ISO string). */
  date: Date | string
  onComplete?: () => void
  /** Render remaining time yourself. Receives seconds left. */
  render?: (parts: { days: number; hours: number; minutes: number; seconds: number; done: boolean }) => React.ReactNode
  style?: StyleProp<AnyStyle>
}

function diff(target: number) {
  const ms = Math.max(0, target - Date.now())
  const totalSec = Math.floor(ms / 1000)
  return {
    days: Math.floor(totalSec / 86400),
    hours: Math.floor((totalSec % 86400) / 3600),
    minutes: Math.floor((totalSec % 3600) / 60),
    seconds: totalSec % 60,
    done: ms === 0,
  }
}

function Countdown({ date, onComplete, render, style }: CountdownProps) {
  const theme = useTheme()
  const target = typeof date === 'string' ? new Date(date).getTime() : date.getTime()
  const [parts, setParts] = React.useState(() => diff(target))

  React.useEffect(() => {
    const id = setInterval(() => {
      const p = diff(target)
      setParts(p)
      if (p.done) {
        clearInterval(id)
        onComplete?.()
      }
    }, 1000)
    return () => clearInterval(id)
  }, [target, onComplete])

  if (render) return <>{render(parts)}</>

  const pad = (n: number) => String(n).padStart(2, '0')
  const cell = (v: string, label: string) => (
    <View style={{ alignItems: 'center' }}>
      <View style={{ minWidth: 40, paddingVertical: 8, paddingHorizontal: 10, borderRadius: 10, backgroundColor: theme.colors['background-muted'], alignItems: 'center' }}>
        <Text style={{ color: theme.colors['foreground-intense'], fontSize: 20, fontWeight: '700', fontVariant: ['tabular-nums'] as any }}>{v}</Text>
      </View>
      <Text style={{ color: theme.colors['foreground-muted'], fontSize: 11, marginTop: 4 }}>{label}</Text>
    </View>
  )

  return (
    <View style={cn({ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }, style)}>
      {cell(String(parts.days), 'Days')}
      {cell(pad(parts.hours), 'Hrs')}
      {cell(pad(parts.minutes), 'Min')}
      {cell(pad(parts.seconds), 'Sec')}
    </View>
  )
}

export { Countdown }
