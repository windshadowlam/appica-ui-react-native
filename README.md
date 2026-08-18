# @appica/ui-react-native

A faithful **React Native port of the [Appica UI](https://appica.dev) component library**, built to match the Appica Figma design system (tokens, typography, spacing, and component APIs) one-to-one — without a web view.

Appica ships a web-only React library (Tailwind + Base UI, OKLCH tokens). This package reproduces that same design language and component surface natively on React Native, so your mobile app looks identical to the Figma file and the web product.

> **Status:** v0.1.0 — all ~70 components implemented, fully typed, and passing `tsc` typechecking.

---

## Why this exists

- The canonical Appica library is **web-only**. There is no official React Native build.
- Figma designs for Appica are expressed in OKLCH color tokens that React Native cannot consume directly.
- This library converts those tokens to sRGB hex, ports Appica's `cn` / `cva` styling primitives to a React Native style-object model, and re-implements every component with the same props, variants, and behaviors.

---

## Installation

```bash
npm install @appica/ui-react-native
# peer deps
npm install react react-native
```

> React Native ≥ 0.72 and React ≥ 18.2 are required.



---

## Quick start

Wrap your app (or a subtree) in the `ThemeProvider` so components can resolve design tokens for the active color scheme and text direction.

```tsx
import * as React from 'react'
import { ThemeProvider, Button, Card, Input } from '@appica/ui-react-native'

export function App() {
  return (
    <ThemeProvider scheme="light" direction="ltr">
      <Card>
        <Input placeholder="Email" />
        <Button variant="primary">Sign in</Button>
      </Card>
    </ThemeProvider>
  )
}
```

`ThemeProvider` defaults to the device color scheme (`useColorScheme`) and LTR. Pass `scheme="dark"` or `direction="rtl"` to override.

---

## Theming & design tokens

Tokens are generated from Appica's OKLCH color blocks (`scripts/gen_tokens.py`) and emitted to `src/theme/tokens.ts` as plain sRGB hex — no runtime color math required.

```ts
import { useTheme } from '@appica/ui-react-native'

function MyThing() {
  const { colors, radius, spacing, fontSizes, shadows } = useTheme()
  return <View style={{ backgroundColor: colors.primary, borderRadius: radius.md }} />
}
```

- **Colors** — `lightColors` / `darkColors` keyed by Appica token names (`primary`, `background`, `foreground`, `border-strong`, `primary-soft`, `foreground-muted`, …).
- **Radius** — `none`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`.
- **Spacing** — 4px-based scale (`spacing[1]` = 4, `spacing[4]` = 16, …).
- **Typography** — `fontSizes` from `xs` to `9xl`, each with `size` + `lineHeight`.
- **Shadows** — `shadows.sm/md/lg`.
- **Fonts** — `fontFamily` (system sans stack).

Light/dark switching is automatic via the provider; components read `theme.colors` so they re-style when the scheme changes.

---

## Styling primitives

Two Appica utilities are ported to a React Native style model so component code stays structurally identical to the source:

### `cn(...styles)` — `src/utils/cn.ts`

RN-native equivalent of `clsx` + `tailwind-merge`. Accepts `StyleProp<AnyStyle>` arrays/objects and flattens + merges them (later wins).

```ts
import { cn } from '@appica/ui-react-native'
style={cn(base, pressed && { opacity: 0.7 }, style)}
```

### `cva(...)` — `src/utils/cva.ts`

RN port of `class-variance-authority`. Instead of returning Tailwind class strings, it returns **arrays of style objects** you can drop straight into `style={}`.

```ts
import { cva } from '@appica/ui-react-native'

const button = cva<AnyStyle>(
  { borderRadius: 8 },
  {
    variants: {
      variant: { primary: { backgroundColor: '#...' }, outline: { borderWidth: 1 } },
      size: { sm: { paddingVertical: 6 }, md: { paddingVertical: 10 } },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

// button({ variant: 'outline', size: 'sm' }) -> AnyStyle[]
```

`VariantPropsOf<T>` extracts the variant prop types for a component.

---

## Component catalog

All components are exported from the package root. Categories:

**Primitives**  
`Button` (+`ButtonGroup`), `Input`, `Textarea`, `Badge`, `Avatar` (+`AvatarGroup`), `Chip`, `Separator`, `Kbd`, `Spinner` (+`Loader` alias), `Skeleton`

**Form & data**  
`Switch`, `Checkbox` (+`CheckboxGroup`/`useCheckboxGroup`), `Radio` (+`RadioGroup`), `Toggle` (+`ToggleGroup`), `Slider`, `Progress`, `Meter`, `Tabs`, `Collapsible`, `Accordion`, `Alert`, `Card` (+`CardHeader`/`CardTitle`/`CardDescription`/`CardFooter`), `Table` (+parts), `Form` (`Label`/`Field`/`Fieldset`), `TextField`, `NumberField`, `OtpField`, `Rating`, `Pagination`

**Navigation**  
`Breadcrumb`, `NavigationMenu`, `Navigation`, `Menubar`, `Toc` (table of contents)

**Overlays & feedback**  
`Dialog`, `Drawer`, `AlertDialog`, `Select`, `Combobox`, `Autocomplete` (alias of `Combobox`), `DropdownMenu` (+`MenuCard`), `ContextMenu`, `Tooltip`, `Popover`, `Toast` (+`ToastProvider`/`useToast`), `ScrollArea`, `PreviewCard`

**Utilities & media**  
`CopyButton`, `Countdown`, `Sparkline`, `Calendar`, `DatePicker`, `DateField`, `TimeField`, `Carousel`, `Thumbnail`

**Color**  
`ColorSwatch`, `ColorSwatchPicker`, `ColorSlider`, `ColorArea`

**Decorative / motion**  
`BackgroundPattern`, `BorderBeam`, `GradientGlow`, `TextAnimate`, `Toolbar`

Compound components (`Card`, `Table`, `Tabs`, `Accordion`, `Dialog`, `Form`, menus) follow the same part composition pattern as Appica web.

---

## TypeScript

The library is written in strict TypeScript. Every component exports a `Props` interface and variant/size union types (e.g. `ButtonVariant`, `ButtonSize`, `BadgeColor`). Use `VariantPropsOf` to derive variant prop types for your own wrappers.

```ts
import type { ButtonProps, ButtonVariant } from '@appica/ui-react-native'
```

### Local typechecking

The library typechecks cleanly with the **real React Native type package** (`react-native` is in `devDependencies`). The old ambient stub (`src/types/react-native.d.ts`) and the relaxed `tsconfig.check.json` were removed — the standard `tsconfig.json` is used everywhere:

```bash
npm install            # installs react-native + typescript + @types/react
npm run typecheck     # tsc --noEmit -p tsconfig.json  (0 errors)
```

`AnyStyle` (`src/utils/cn.ts`) is typed as `ViewStyle | TextStyle` (strict, not `any`).

---

## Project structure

```
Appica-Native/
├─ scripts/gen_tokens.py     # OKLCH -> sRGB hex token generator
├─ src/
│  ├─ index.ts               # package entry (re-exports everything)
│  ├─ components/            # one folder per component + central barrel
│  │  └─ index.ts            # single import surface (mirrors @appica/ui-react)
│  ├─ theme/                 # ThemeProvider, tokens, token types
│  ├─ utils/                 # cn, cva
│  ├─ hooks/                 # useControllableState, etc.
├─ sample/                   # React Native demo app (consumes the library)
│  └─ README.md              # install + iOS/Android native build steps
├─ tsconfig.json             # standard (app) config
```

---

## Demo app (native builds)

`sample/` is a React Native 0.75 app that imports the library via a local `file:..` dependency and demos every component. It builds for **iOS** (`xcodebuild`) and **Android** (`gradlew`), with the gotchas (Hermes `NODE_OPTIONS`, glog/Xcode 26, JDK 17 for Gradle) documented in [`sample/README.md`](./sample/README.md).

---

## Notes & limitations

- **OKLCH → hex:** token colors are pre-converted at build time; the runtime never interprets OKLCH.
- **Web-only primitives:** components that are inherently DOM/overlay-based (popovers, tooltips, dialogs) use React Native `Modal`, `Pressable`, `Animated`, and `PanResponder` with behavior matching Appica's as closely as the platform allows.
- **No external UI deps:** everything is built on core React Native primitives — no third-party component kit required.

## License

MIT — same as the upstream Appica UI project.
