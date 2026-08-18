import * as React from 'react'
import { Pressable, View, Text, type StyleProp } from 'react-native'
import Clipboard from '@react-native-clipboard/clipboard'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'

export interface CopyButtonProps {
  text: string
  size?: 'sm' | 'md'
  style?: StyleProp<AnyStyle>
}

/** Copies `text` to the clipboard and shows a confirmation check. */
function CopyButton({ text, size = 'md', style }: CopyButtonProps) {
  const theme = useTheme()
  const [copied, setCopied] = React.useState(false)

  const copy = () => {
    Clipboard.setString(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const dim = size === 'sm' ? 28 : 34
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Copy"
      onPress={copy}
      style={({ pressed }) =>
        cn(
          {
            width: dim,
            height: dim,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: theme.colors['border-strong'],
            backgroundColor: theme.colors.background,
            opacity: pressed ? 0.7 : 1,
          },
          style,
        )
      }
    >
      {copied ? (
        <Text style={{ color: theme.colors.success, fontSize: size === 'sm' ? 13 : 15, fontWeight: '700' }}>✓</Text>
      ) : (
        <View style={{ width: size === 'sm' ? 13 : 15, height: size === 'sm' ? 15 : 17, borderWidth: 1.5, borderColor: theme.colors['foreground-muted'], borderRadius: 3, borderBottomWidth: 3 }} />
      )}
    </Pressable>
  )
}

export { CopyButton }
