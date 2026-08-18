import * as React from 'react'
import {
  Pressable,
  Text,
  View,
  ActivityIndicator,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native'
import { useTheme } from '../../theme/theme'
import { makeButtonVariants } from './button-variants'
import { cn, type AnyStyle } from '../../utils/cn'
import {
  ButtonGroupContext,
  type ButtonVariant,
  type ButtonSize,
} from './button-group-context'

export interface ButtonProps extends Omit<PressableProps, 'style' | 'disabled'> {
  /** Visual style. @default 'primary' */
  variant?: ButtonVariant
  /** Height/padding. `icon-*` sizes are square. @default 'md' */
  size?: ButtonSize
  disabled?: boolean
  /** Show a spinner and block presses. */
  loading?: boolean
  /** Adornment rendered before the label. */
  startIcon?: React.ReactNode
  /** Adornment rendered after the label. */
  endIcon?: React.ReactNode
  style?: StyleProp<AnyStyle>
  children?: React.ReactNode
}

// Press overlay color per variant — replicates Appica's `before:bg` halo that
// fades in on hover/press for filled buttons.
const PRESS_OVERLAY: Record<ButtonVariant, string> = {
  primary: 'rgba(0,0,0,0.12)',
  'primary-outline': 'rgba(0,0,0,0.06)',
  secondary: 'rgba(0,0,0,0.12)',
  soft: 'rgba(0,0,0,0.04)',
  outline: 'rgba(0,0,0,0.04)',
  ghost: 'rgba(0,0,0,0.06)',
  destructive: 'rgba(0,0,0,0.12)',
  light: 'rgba(255,255,255,0.10)',
}

const TEXT_COLOR: Record<ButtonVariant, string> = {
  primary: '#FFFFFF',
  'primary-outline': '#101828',
  secondary: '#101828',
  soft: '#1B2333',
  outline: '#1B2333',
  ghost: '#1B2333',
  destructive: '#101828',
  light: '#FFFFFF',
}

function Button({
  variant,
  size,
  disabled,
  loading,
  startIcon,
  endIcon,
  style,
  children,
  onPressIn,
  onPressOut,
  ...props
}: ButtonProps) {
  const theme = useTheme()
  const group = React.useContext(ButtonGroupContext)
  const resolvedVariant: ButtonVariant = variant ?? group?.variant ?? 'primary'
  const resolvedSize: ButtonSize = size ?? group?.size ?? 'md'
  const resolvedDisabled = disabled || group?.disabled || loading

  const variants = React.useMemo(() => makeButtonVariants(theme.colors), [theme.colors])
  const baseStyles = variants({ variant: resolvedVariant, size: resolvedSize })

  const [pressed, setPressed] = React.useState(false)

  const isIconOnly = React.Children.count(children) === 0 && !startIcon && !endIcon

  return (
    <Pressable
      accessibilityRole="button"
      disabled={resolvedDisabled}
      onPressIn={(e) => {
        setPressed(true)
        onPressIn?.(e)
      }}
      onPressOut={(e) => {
        setPressed(false)
        onPressOut?.(e)
      }}
      style={() =>
        cn(
          baseStyles,
          // rounded corners collapse when joined inside a ButtonGroup
          group && { borderRadius: 0 },
          resolvedDisabled && { opacity: 0.5 },
          style as AnyStyle,
        ) as StyleProp<ViewStyle>
      }
      {...props}
    >
      <View
        pointerEvents="none"
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: PRESS_OVERLAY[resolvedVariant],
            opacity: pressed ? 1 : 0,
          },
        ]}
      />
      {loading ? (
        <ActivityIndicator
          color={TEXT_COLOR[resolvedVariant]}
          size={resolvedSize === 'lg' ? 'large' : 'small'}
        />
      ) : (
        <View
          style={{ flexDirection: 'row', alignItems: 'center', gap: resolvedSize === 'sm' ? 4 : 6 }}
        >
          {startIcon ? <View style={{ marginRight: isIconOnly ? 0 : 6 }}>{startIcon}</View> : null}
          {children != null ? (
            <Text
              style={[
                {
                  color: TEXT_COLOR[resolvedVariant],
                  fontWeight: '500',
                  fontSize: resolvedSize === 'sm' ? 12 : resolvedSize === 'lg' ? 16 : 14,
                  textAlign: 'center',
                },
              ]}
            >
              {children}
            </Text>
          ) : null}
          {endIcon ? <View style={{ marginLeft: isIconOnly ? 0 : 6 }}>{endIcon}</View> : null}
        </View>
      )}
    </Pressable>
  )
}

export { Button }
