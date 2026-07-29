import { useState, useEffect } from 'react'

export function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [updatedValue, setUpdatedValue] = useState(value)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setUpdatedValue(value)
    }, delayMs)
    return () => clearTimeout(timeoutId)
  }, [delayMs, value])

  return updatedValue
}
