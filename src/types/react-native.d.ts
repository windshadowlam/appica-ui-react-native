// Minimal ambient type stub for `react-native` used ONLY for local typechecking
// (the real types ship with the react-native package). Components are declared
// as ambient classes so they work as JSX elements and shadow DOM globals.
declare module 'react-native' {
  import * as React from 'react'

  export type StyleProp<T> = T | T[] | null | undefined | false
  export type ViewStyle = Record<string, any>
  export type TextStyle = Record<string, any>
  export type ImageStyle = Record<string, any>
  export type ViewProps = Record<string, any>
  export type TextProps = Record<string, any>
  export type PressableProps = Record<string, any>
  export type TextInputProps = Record<string, any>
  export type ScrollViewProps = Record<string, any>
  export type ImageProps = Record<string, any>
  export type ImageSourcePropType = any
  export type GestureResponderEvent = any
  export type NativeSyntheticEvent<T> = any
  export type LayoutChangeEvent = any
  export type LayoutRectangle = { x: number; y: number; width: number; height: number }

  export class View extends React.Component<ViewProps> {}
  export class Text extends React.Component<TextProps> {}
  export class Pressable extends React.Component<PressableProps> {}
  export class TextInput extends React.Component<TextInputProps> {
    focus(): void {}
    blur(): void {}
    clear(): void {}
    isFocused(): boolean { return false }
  }
  export class ScrollView extends React.Component<ScrollViewProps> {}
  export class Image extends React.Component<ImageProps> {}
  export class Modal extends React.Component<any> {}
  export class FlatList<T = any> extends React.Component<any> {}
  export class ActivityIndicator extends React.Component<any> {}
  export class Slider extends React.Component<any> {}

  export const Clipboard: { setString?: (s: string) => void } | undefined
  export const PanResponder: any
  export const StyleSheet: any
  export const Easing: any
  export const Animated: any
  export function useColorScheme(): 'light' | 'dark' | null
}
