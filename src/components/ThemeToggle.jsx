import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const prefersDark = typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-color-scheme: dark)').matches

  const [dark, setDark] = useState(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
    if (stored) return stored === 'dark'
    return prefersDark
  })

  useEffect(() => {
    const root = document.documentElement
    if (dark) root.classList.add('dark')
    else root.classList.remove('dark')
    try { localStorage.setItem('theme', dark ? 'dark' : 'light') } catch {}
  }, [dark])

  return (
    <button
      onClick={() => setDark(d => !d)}
      className="rounded-full border border-token bg-surface2 px-3 py-1 text-sm text-body hover:shadow"
      aria-label="Toggle dark mode"
      title={dark ? 'Switch to light' : 'Switch to dark'}
    >
      {dark ? '☀️ Light' : '🌙 Dark'}
    </button>
  )
}
