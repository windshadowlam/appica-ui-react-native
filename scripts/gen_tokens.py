#!/usr/bin/env python3
"""Convert Appica UI design tokens (OKLCH) to React Native hex tokens.
Source of truth: appica-dev/appica-ui packages/react/styles.css (light + dark)."""
import math

def oklch_to_srgb(L, C, H, alpha=1.0):
    # OKLCH -> OKLab
    h = math.radians(H)
    a = C * math.cos(h)
    b = C * math.sin(h)
    # OKLab -> LMS (cube)
    l_ = L + 0.3963377774 * a + 0.2158037573 * b
    m_ = L - 0.1055613458 * a - 0.0638541728 * b
    s_ = L - 0.0894841775 * a - 1.2914855480 * b
    l, m, s = l_**3, m_**3, s_**3
    # LMS -> linear sRGB
    r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
    g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
    bb = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
    def enc(x):
        x = max(0.0, min(1.0, x))
        return 12.92 * x if x <= 0.0031308 else 1.055 * (x ** (1/2.4)) - 0.055
    R, G, B = enc(r), enc(g), enc(bb)
    return (round(R*255), round(G*255), round(B*255), alpha)

def hex8(t):
    r, g, b, a = t
    return f'#{r:02X}{g:02X}{b:02X}{round(a*255):02X}'

# (name, L, C, H, alpha)
light = {
    'foreground': (0.446,0.03,256.802,1),
    'foreground-subtle': (0.707,0.022,261.325,1),
    'foreground-muted': (0.551,0.027,264.364,1),
    'foreground-strong': (0.373,0.034,259.733,1),
    'foreground-emphasis': (0.278,0.033,256.848,1),
    'foreground-intense': (0.21,0.034,264.665,1),
    'foreground-inverse': (1,0,0,1),
    'background': (1,0,0,1),
    'background-subtle': (0.985,0.002,247.839,1),
    'background-muted': (0.967,0.003,264.542,1),
    'background-strong': (0.928,0.006,264.531,1),
    'background-inverse': (0.13,0.028,261.692,1),
    'border': (0.928,0.006,264.531,1),
    'border-muted': (0.967,0.003,264.542,1),
    'border-strong': (0.872,0.01,258.338,1),
    'border-emphasis': (0.707,0.022,261.325,1),
    'border-intense': (0.551,0.027,264.364,1),
    'border-inverse': (0.278,0.033,256.848,1),
    'border-overlay': (0.967,0.003,264.542,1),
    'primary': (0.21,0.034,264.665,1),
    'primary-subtle': (0.967,0.003,264.542,1),
    'primary-soft': (0.928,0.006,264.531,1),
    'primary-muted': (0.373,0.034,259.733,1),
    'primary-strong': (0.13,0.028,261.692,1),
    'primary-foreground': (1,0,0,1),
    'secondary': (0.809,0.105,251.813,1),
    'secondary-subtle': (0.623,0.214,259.815,0.10),
    'secondary-soft': (0.623,0.214,259.815,0.20),
    'secondary-muted': (0.882,0.059,254.128,1),
    'secondary-strong': (0.707,0.165,254.624,1),
    'secondary-emphasis': (0.623,0.214,259.815,1),
    'secondary-intense': (0.546,0.245,262.881,1),
    'secondary-foreground': (0.13,0.028,261.692,1),
    'error': (0.808,0.114,19.571,1),
    'error-subtle': (0.637,0.237,25.331,0.10),
    'error-soft': (0.637,0.237,25.331,0.20),
    'error-muted': (0.885,0.062,18.334,1),
    'error-strong': (0.704,0.191,22.216,1),
    'error-emphasis': (0.637,0.237,25.331,1),
    'error-intense': (0.577,0.245,27.325,1),
    'error-foreground': (0.13,0.028,261.692,1),
    'success': (0.845,0.143,164.978,1),
    'success-subtle': (0.696,0.17,162.48,0.10),
    'success-soft': (0.696,0.17,162.48,0.20),
    'success-muted': (0.905,0.093,164.15,1),
    'success-strong': (0.765,0.177,163.223,1),
    'success-emphasis': (0.696,0.17,162.48,1),
    'success-intense': (0.596,0.145,163.225,1),
    'success-foreground': (0.13,0.028,261.692,1),
    'warning': (0.837,0.128,66.29,1),
    'warning-subtle': (0.705,0.213,47.604,0.10),
    'warning-soft': (0.705,0.213,47.604,0.20),
    'warning-muted': (0.901,0.076,70.697,1),
    'warning-strong': (0.75,0.183,55.934,1),
    'warning-emphasis': (0.705,0.213,47.604,1),
    'warning-intense': (0.646,0.222,41.116,1),
    'warning-foreground': (0.13,0.028,261.692,1),
    'info': (0.828,0.111,230.318,1),
    'info-subtle': (0.685,0.169,237.323,0.10),
    'info-soft': (0.685,0.169,237.323,0.20),
    'info-muted': (0.901,0.058,230.902,1),
    'info-strong': (0.746,0.16,232.661,1),
    'info-emphasis': (0.685,0.169,237.323,1),
    'info-intense': (0.588,0.158,241.966,1),
    'info-foreground': (0.13,0.028,261.692,1),
    'ring': (0.872,0.01,258.338,1),
    'ring-input': (0.928,0.006,264.531,1),
}

dark = {
    'foreground': (0.967,0.003,264.542,1),
    'foreground-subtle': (0.707,0.022,261.325,1),
    'foreground-muted': (0.551,0.027,264.364,1),
    'foreground-strong': (0.373,0.034,259.733,1),
    'foreground-emphasis': (0.278,0.033,256.848,1),
    'foreground-intense': (0.21,0.034,264.665,1),
    'foreground-inverse': (0.13,0.028,261.692,1),
    'background': (0.13,0.028,261.692,1),
    'background-subtle': (0.551,0.027,264.364,0.08),
    'background-muted': (0.21,0.034,264.665,1),
    'background-strong': (0.278,0.033,256.848,1),
    'background-inverse': (1,0,0,1),
    'border': (0.278,0.033,256.848,1),
    'border-muted': (0.21,0.034,264.665,1),
    'border-strong': (0.373,0.034,259.733,1),
    'border-emphasis': (0.446,0.03,256.802,1),
    'border-intense': (0.551,0.027,264.364,1),
    'border-inverse': (0.928,0.006,264.531,1),
    'border-overlay': (0.278,0.033,256.848,1),
    'primary': (1,0,0,1),
    'primary-subtle': (0.21,0.034,264.665,1),
    'primary-soft': (0.278,0.033,256.848,1),
    'primary-muted': (0.928,0.006,264.531,1),
    'primary-strong': (1,0,0,1),
    'primary-foreground': (0.21,0.034,264.665,1),
    'secondary': (0.707,0.165,254.624,1),
    'secondary-subtle': (0.623,0.214,259.815,0.10),
    'secondary-soft': (0.623,0.214,259.815,0.20),
    'secondary-muted': (0.809,0.105,251.813,1),
    'secondary-strong': (0.707,0.165,254.624,1),
    'secondary-emphasis': (0.623,0.214,259.815,1),
    'secondary-intense': (0.546,0.245,262.881,1),
    'secondary-foreground': (0.13,0.028,261.692,1),
    'error': (0.704,0.191,22.216,1),
    'error-subtle': (0.637,0.237,25.331,0.10),
    'error-soft': (0.637,0.237,25.331,0.20),
    'error-muted': (0.808,0.114,19.571,1),
    'error-strong': (0.704,0.191,22.216,1),
    'error-emphasis': (0.637,0.237,25.331,1),
    'error-intense': (0.577,0.245,27.325,1),
    'error-foreground': (0.13,0.028,261.692,1),
    'success': (0.765,0.177,163.223,1),
    'success-subtle': (0.696,0.17,162.48,0.10),
    'success-soft': (0.696,0.17,162.48,0.20),
    'success-muted': (0.845,0.143,164.978,1),
    'success-strong': (0.765,0.177,163.223,1),
    'success-emphasis': (0.696,0.17,162.48,1),
    'success-intense': (0.596,0.145,163.225,1),
    'success-foreground': (0.13,0.028,261.692,1),
    'warning': (0.75,0.183,55.934,1),
    'warning-subtle': (0.705,0.213,47.604,0.10),
    'warning-soft': (0.705,0.213,47.604,0.20),
    'warning-muted': (0.837,0.128,66.29,1),
    'warning-strong': (0.75,0.183,55.934,1),
    'warning-emphasis': (0.705,0.213,47.604,1),
    'warning-intense': (0.646,0.222,41.116,1),
    'warning-foreground': (0.13,0.028,261.692,1),
    'info': (0.746,0.16,232.661,1),
    'info-subtle': (0.685,0.169,237.323,0.10),
    'info-soft': (0.685,0.169,237.323,0.20),
    'info-muted': (0.828,0.111,230.318,1),
    'info-strong': (0.746,0.16,232.661,1),
    'info-emphasis': (0.685,0.169,237.323,1),
    'info-intense': (0.588,0.158,241.966,1),
    'info-foreground': (0.13,0.028,261.692,1),
    'ring': (0.373,0.034,259.733,1),
    'ring-input': (0.278,0.033,256.848,1),
}

def emit(name, d):
    lines = [f"  '{k}': '{hex8(oklch_to_srgb(*v))}'," for k, v in d.items()]
    return '  ' + f'// {name}\n  ' + '\n  '.join(lines)

radius = '''  // Radius scale (px) — mirrors Tailwind defaults Appica builds on
  none: 0,
  '4xs': 2,
  '3xs': 3,
  '2xs': 4,
  xs: 6,
  sm: 8,
  md: 10,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  '4xl': 32,'''

shadows = '''  // Elevation shadows
  '2xs': '0 1px rgba(0,0,0,0.10)',
  xs: '0 1px 4px 0 rgba(0,0,0,0.10)',
  sm: '0 2px 8px -2px rgba(0,0,0,0.12)',
  md: '0 4px 8px -2px rgba(0,0,0,0.12)',
  lg: '0 8px 16px -4px rgba(0,0,0,0.12)',
  xl: '0 12px 28px -6px rgba(0,0,0,0.12)',
  '2xl': '0 24px 32px -12px rgba(0,0,0,0.12)','''

fontSizes = '''  // Type scale (px / lineHeight px)
  xs: { size: 12, lineHeight: 16 },
  sm: { size: 14, lineHeight: 20 },
  base: { size: 16, lineHeight: 24 },
  lg: { size: 18, lineHeight: 26 },
  xl: { size: 20, lineHeight: 28 },
  '2xl': { size: 24, lineHeight: 30 },
  '3xl': { size: 28, lineHeight: 34 },
  '4xl': { size: 32, lineHeight: 38 },
  '5xl': { size: 40, lineHeight: 46 },
  '6xl': { size: 48, lineHeight: 54 },
  '7xl': { size: 60, lineHeight: 66 },
  '8xl': { size: 72, lineHeight: 78 },
  '9xl': { size: 96, lineHeight: 100 },'''

spacing = '''  // Spacing scale (px) — Tailwind 4px base
  0: 0, px: 1, '0.5': 2, 1: 4, '1.5': 6, 2: 8, '2.5': 10, 3: 12, 4: 16,
  5: 20, 6: 24, 7: 28, 8: 32, 9: 36, 10: 40, 11: 44, 12: 48, 14: 56,
  16: 64, 20: 80, 24: 96, 28: 112, 32: 128, 36: 144, 40: 160, 44: 176, 48: 192,
  52: 208, 56: 224, 60: 240, 64: 256, 72: 288, 80: 320, 96: 384,'''

out = f'''// AUTO-GENERATED from Appica UI design tokens (appica-dev/appica-ui styles.css).
// OKLCH source values were converted to sRGB hex for React Native compatibility.
// Light = Appica ":root, .light" block; Dark = Appica ".dark" block.

export const lightColors = {{
{emit("light", light)}
}}

export const darkColors = {{
{emit("dark", dark)}
}}

export const radius = {{
{radius}
}}

export const shadows = {{
{shadows}
}}

export const fontSizes = {{
{fontSizes}
}}

export const spacing = {{
{spacing}
}}

export const fontFamily = {{
  sans: undefined, // undefined => platform default system font
  mono: undefined, // undefined => platform default monospace
}}
'''
import os
os.makedirs('/Users/alanlam/WorkBuddy/Appica-Native/src/theme', exist_ok=True)
with open('/Users/alanlam/WorkBuddy/Appica-Native/src/theme/tokens.ts','w') as f:
    f.write(out)
print("wrote tokens.ts", len(out), "bytes")
print("sample light primary:", hex8(oklch_to_srgb(*light['primary'])))
print("sample dark primary:", hex8(oklch_to_srgb(*dark['primary'])))
print("sample secondary:", hex8(oklch_to_srgb(*light['secondary'])))
print("sample success:", hex8(oklch_to_srgb(*light['success'])))
