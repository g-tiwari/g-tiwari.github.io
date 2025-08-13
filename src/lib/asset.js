// src/lib/asset.js
export function asset(p) {
  if (!p) return p
  if (/^https?:\/\//i.test(p)) return p
  const clean = p.replace(/^\//, '')
  const base = (import.meta && import.meta.env && import.meta.env.BASE_URL) ? import.meta.env.BASE_URL : '/'
  const baseNorm = base.endsWith('/') ? base : base + '/'
  return baseNorm + clean
}
