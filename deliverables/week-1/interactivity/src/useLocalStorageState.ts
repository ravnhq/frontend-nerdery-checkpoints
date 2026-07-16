// TODO: initialize state from localStorage[key] (JSON-parsed) when present,
// otherwise from initialValue. Write JSON to localStorage on every change.
import { useState, useCallback } from 'react'

export function useLocalStorageState<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(() => {
    const stored = localStorage.getItem(key)
    return stored !== null ? (JSON.parse(stored) as T) : initialValue
  })

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setState((prev) => {
        const next = typeof value === 'function' ? (value as (prev: T) => T)(prev) : value
        localStorage.setItem(key, JSON.stringify(next))
        return next
      })
    },
    [key],
  )

  return [state, setValue]
}
