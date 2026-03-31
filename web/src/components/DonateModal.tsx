'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

interface Props {
  open: boolean
  onClose: () => void
}

export default function DonateModal({ open, onClose }: Props) {
  const t = useTranslations('home')
  const overlayRef = useRef<HTMLDivElement>(null)

  // Close on Escape key
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={e => { if (e.target === overlayRef.current) onClose() }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

      {/* Modal */}
      <div className="relative w-full max-w-sm rounded-2xl border border-[var(--card-border)] bg-[var(--background)] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            {/* Coffee cup icon */}
            <span className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 8h1a4 4 0 1 1 0 8h-1"/>
                <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"/>
                <line x1="6" y1="2" x2="6" y2="4"/>
                <line x1="10" y1="2" x2="10" y2="4"/>
                <line x1="14" y1="2" x2="14" y2="4"/>
              </svg>
            </span>
            <h2 className="text-base font-bold text-[var(--foreground)]">{t('donate_title')}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-md flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 flex flex-col items-center text-center gap-4">
          <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
            {t('donate_desc')}
          </p>

          {/* QR card */}
          <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 flex flex-col items-center gap-3">
            <Image
              src="/qrvcb.jpg"
              alt="VCB Donate QR Code"
              width={200}
              height={200}
              className="rounded-lg"
              priority
            />
            <p className="text-xs text-[var(--muted-foreground)]">{t('donate_scan')}</p>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2 rounded-lg border border-[var(--border)] text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
