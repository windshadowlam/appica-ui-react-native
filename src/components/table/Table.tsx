import * as React from 'react'
import { View, Text, ScrollView, type ViewProps, type StyleProp } from 'react-native'
import { useTheme } from '../../theme/theme'
import { cn, type AnyStyle } from '../../utils/cn'

export interface TableProps extends ViewProps {
  style?: StyleProp<AnyStyle>
  children?: React.ReactNode
}

function Table({ style, children, ...props }: TableProps) {
  const theme = useTheme()
  return (
    <ScrollView horizontal style={cn({ borderRadius: 12, borderWidth: 1, borderColor: theme.colors['border-muted'] }, style)}>
      <View data-slot="table" style={{ backgroundColor: theme.colors.background }} {...props}>
        {children}
      </View>
    </ScrollView>
  )
}

function TableHeader({ style, children, ...props }: ViewProps) {
  const theme = useTheme()
  return <View data-slot="table-header" style={cn({ backgroundColor: theme.colors['background-subtle'], borderBottomWidth: 1, borderColor: theme.colors['border-muted'] }, style)} {...props}>{children}</View>
}

function TableBody({ style, children, ...props }: ViewProps) {
  return <View data-slot="table-body" style={cn(style)} {...props}>{children}</View>
}

function TableRow({ style, children, ...props }: ViewProps) {
  const theme = useTheme()
  return <View data-slot="table-row" style={cn({ flexDirection: 'row', borderBottomWidth: 1, borderColor: theme.colors['border-muted'] }, style)} {...props}>{children}</View>
}

function TableHead({ style, children, ...props }: ViewProps) {
  const theme = useTheme()
  return (
    <View data-slot="table-head" style={cn({ paddingVertical: 10, paddingHorizontal: 14 }, style)} {...props}>
      {typeof children === 'string' ? (
        <Text style={{ color: theme.colors['foreground-muted'], fontSize: 12, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 }}>{children}</Text>
      ) : (
        children
      )}
    </View>
  )
}

function TableCell({ style, children, ...props }: ViewProps) {
  const theme = useTheme()
  return (
    <View data-slot="table-cell" style={cn({ paddingVertical: 12, paddingHorizontal: 14 }, style)} {...props}>
      {typeof children === 'string' || typeof children === 'number' ? (
        <Text style={{ color: theme.colors['foreground-emphasis'], fontSize: 14 }}>{children}</Text>
      ) : (
        children
      )}
    </View>
  )
}

function TableCaption({ style, children, ...props }: ViewProps) {
  const theme = useTheme()
  return (
    <View data-slot="table-caption" style={cn({ padding: 10 }, style)} {...props}>
      {typeof children === 'string' ? <Text style={{ color: theme.colors['foreground-muted'], fontSize: 12, textAlign: 'center' }}>{children}</Text> : children}
    </View>
  )
}

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption }
