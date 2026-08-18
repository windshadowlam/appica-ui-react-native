import * as React from 'react'
import { View, type ViewProps } from 'react-native'
import { useTheme } from '../../theme/theme'
import { ButtonGroupContext, type ButtonVariant, type ButtonSize } from './button-group-context'
import { cn } from '../../utils/cn'

export interface ButtonGroupProps extends ViewProps {
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  orientation?: 'horizontal' | 'vertical'
  /** Visual gap between joined buttons. @default 0 (seamless) */
  attached?: boolean
}

/**
 * Groups Buttons so they share variant/size/disabled and render seamlessly,
 * mirroring `@appica/ui-react/button-group`.
 */
function ButtonGroup({
  variant,
  size,
  disabled,
  orientation = 'horizontal',
  attached = true,
  style,
  children,
  ...props
}: ButtonGroupProps) {
  const theme = useTheme()
  const ctx = React.useMemo(
    () => ({ variant, size, disabled }),
    [variant, size, disabled],
  )

  const childArray = React.Children.toArray(children).filter(Boolean)

  return (
    <ButtonGroupContext.Provider value={ctx}>
      <View
        style={cn(
          {
            flexDirection: orientation === 'horizontal' ? 'row' : 'column',
            overflow: 'hidden',
            borderRadius: size === 'sm' ? 8 : size === 'lg' ? 12 : 10,
            borderWidth: 1,
            borderColor: theme.colors['border-strong'],
          },
          style,
        )}
        {...props}
      >
        {childArray.map((child, i) => (
          <React.Fragment key={i}>
            {i > 0 && attached ? (
              <View
                style={{
                  width: orientation === 'horizontal' ? 1 : undefined,
                  height: orientation === 'vertical' ? 1 : undefined,
                  backgroundColor: theme.colors['border-strong'],
                }}
              />
            ) : null}
            {child}
          </React.Fragment>
        ))}
      </View>
    </ButtonGroupContext.Provider>
  )
}

export { ButtonGroup }
