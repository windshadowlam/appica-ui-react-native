import * as React from 'react'
import { Modal, Pressable, View, Text, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'

export interface ToastOptions {
  title?: React.ReactNode
  description?: React.ReactNode
  color?: 'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'info'
  duration?: number
  action?: { label: string; onPress: () => void }
}

interface ToastRecord extends ToastOptions {
  id: number
}

interface ToastContextValue {
  toast: (opts: ToastOptions) => void
  dismiss: (id: number) => void
}

const ToastContext = React.createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const theme = useTheme()
  const [toasts, setToasts] = React.useState<ToastRecord[]>([])
  const idRef = React.useRef(0)

  const dismiss = React.useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id))
  }, [])

  const toast = React.useCallback(
    (opts: ToastOptions) => {
      const id = ++idRef.current
      setToasts((t) => [...t, { ...opts, id }])
      const duration = opts.duration ?? 3500
      if (duration > 0) setTimeout(() => dismiss(id), duration)
    },
    [dismiss],
  )

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <Modal visible={toasts.length > 0} transparent animationType="fade" onRequestClose={() => {}}>
        <View pointerEvents="box-none" style={{ position: 'absolute', top: 0, left: 0, right: 0, paddingTop: 48, alignItems: 'center', gap: 8 }}>
          {toasts.map((t) => {
            const accent = t.color ? theme.colors[`${t.color}-emphasis` as keyof typeof theme.colors] : theme.colors.primary
            return (
              <View
                key={t.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                  width: '90%',
                  maxWidth: 440,
                  padding: 14,
                  borderRadius: 12,
                  backgroundColor: theme.colors.background,
                  borderLeftWidth: 4,
                  borderLeftColor: accent as string,
                  borderWidth: 1,
                  borderColor: theme.colors['border-muted'],
                  shadowColor: '#000',
                  shadowOpacity: 0.14,
                  shadowRadius: 16,
                  shadowOffset: { width: 0, height: 8 },
                  elevation: 8,
                }}
              >
                <View style={{ flex: 1, gap: 2 }}>
                  {t.title != null ? <Text style={{ color: theme.colors['foreground-intense'], fontSize: 14, fontWeight: '600' }}>{t.title}</Text> : null}
                  {t.description != null ? <Text style={{ color: theme.colors['foreground-muted'], fontSize: 13 }}>{t.description}</Text> : null}
                </View>
                {t.action ? (
                  <Pressable onPress={() => { t.action!.onPress(); dismiss(t.id) }}>
                    <Text style={{ color: theme.colors.primary, fontWeight: '600' }}>{t.action.label}</Text>
                  </Pressable>
                ) : null}
                <Pressable onPress={() => dismiss(t.id)}>
                  <Text style={{ color: theme.colors['foreground-muted'], fontSize: 16 }}>✕</Text>
                </Pressable>
              </View>
            )
          })}
        </View>
      </Modal>
    </ToastContext.Provider>
  )
}

export function useToast(): ToastContextValue {
  const ctx = React.useContext(ToastContext)
  if (!ctx) {
    // No-op fallback so components don't crash outside a provider.
    return { toast: () => {}, dismiss: () => {} }
  }
  return ctx
}

export { }
