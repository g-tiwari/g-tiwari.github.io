'use client'

import { useEffect, useRef, useMemo } from 'react'
import { asset } from '../lib/asset'

export default function ParallaxHero({
  src = 'images/golden-gate.webp',
  alt = 'Golden Gate Bridge in morning fog',
  speed = 0.18,
  className = '',
  children
}) {
  const wrapRef = useRef(null)
  const imgRef = useRef(null)
  const resolvedSrc = useMemo(() => asset(src), [src])

  useEffect(() => {
    const wrap = wrapRef.current
    const img = imgRef.current
    if (!wrap || !img) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    const update = () => {
      const rect = wrap.getBoundingClientRect()
      const viewH = window.innerHeight || document.documentElement.clientHeight
      if (rect.bottom >= 0 && rect.top <= viewH) {
        const offset = (rect.top - viewH / 2) * speed
        img.style.setProperty('--y', `${offset}px`)
      }
      raf = 0
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    document.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    update()

    return () => {
      document.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [speed])

  return (
    <section className={`relative h-full min-h-[45vh] overflow-hidden ${className}`}>
      <div ref={wrapRef} className='absolute inset-0 pointer-events-none'>
        <img
          ref={imgRef}
          src={resolvedSrc}
          alt={alt}
          fetchpriority='high'
          decoding='async'
          className='absolute left-1/2 top-1/2 min-w-full min-h-[120%] -translate-x-1/2 -translate-y-1/2 [transform:translate3d(-50%,-50%,0)_translateY(var(--y,0px))]'
        />
      </div>

      {/* Theme-aware overlays for contrast + warmth */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute inset-0 bg-gradient-to-b from-[var(--hero-overlay-from)] to-[var(--hero-overlay-to)]' />
        <div className='absolute inset-0 bg-[var(--hero-tint)] mix-blend-soft-light' />
      </div>

      <div className='relative z-10 mx-auto max-w-6xl px-6 py-8 md:py-12 text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)]'>
        {children}
      </div>
    </section>
  )
}
