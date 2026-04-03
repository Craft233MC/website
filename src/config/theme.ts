export const accentPalette = {
  300: '#6ee7b7',
  400: '#34d399',
  500: '#10b981',
  600: '#059669',
  700: '#047857',
} as const

export const applyAccentPalette = () => {
  const root = document.documentElement
  root.style.setProperty('--accent-300', accentPalette[300])
  root.style.setProperty('--accent-400', accentPalette[400])
  root.style.setProperty('--accent-500', accentPalette[500])
  root.style.setProperty('--accent-600', accentPalette[600])
  root.style.setProperty('--accent-700', accentPalette[700])
}
