import { motion, useReducedMotion } from 'motion/react'

type LoadingTextProps = {
  text: string
  variant: 'eyebrow' | 'title'
}

export function LoadingText({ text, variant }: LoadingTextProps) {
  const shouldReduceMotion = useReducedMotion()
  const isTitle = variant === 'title'

  return (
    <span className="users-view__animated-text">
      <span className="users-view__sr-only">{text}</span>
      <span aria-hidden="true">
        {Array.from(text).map((letter, index) => (
          <motion.span
            className="users-view__letter"
            key={`${letter}-${index}`}
            animate={shouldReduceMotion ? undefined : isTitle
              ? { color: ['#94a3b8', '#67e8f9', '#f8fafc', '#c4b5fd', '#94a3b8'], opacity: [0.35, 1, 0.65, 1], rotate: [0, -4, 3, 0], y: [0, -11, 3, 0] }
              : { color: ['#64748b', '#e2e8f0', '#67e8f9', '#64748b'], opacity: [0.45, 1, 0.75, 0.45], scale: [0.92, 1.08, 1], y: [0, -4, 0] }}
            transition={isTitle
              ? { delay: index * 0.06, duration: 1.2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.7 }
              : { delay: index * 0.09, duration: 2, ease: 'easeInOut', repeat: Infinity }}
          >
            {letter === ' ' ? '\u00a0' : letter}
          </motion.span>
        ))}
      </span>
    </span>
  )
}
