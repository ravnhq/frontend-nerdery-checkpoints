// TODO: return `value`, but only update the returned value `delayMs` ms after
// `value` stops changing. Use useState + useEffect with setTimeout, and clear
// the timeout in the effect cleanup so rapid changes reset the timer.
import { useEffect, useState } from 'react'

export function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs)
    return () => clearTimeout(timer)
  }, [value, delayMs])

  return debounced
}
