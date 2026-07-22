import { useState } from 'react'

export function useLocalStorageState<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key)
    try {
      return stored === null ? initialValue : (JSON.parse(stored) as T)
    } catch {
      return initialValue
    }
  })

  const setStoredValue = (next: T | ((prev: T) => T)): void => {
    const resolved = typeof next === 'function' ? (next as (prev: T) => T)(value) : next
    localStorage.setItem(key, JSON.stringify(resolved))
    setValue(resolved)
  }

  return [value, setStoredValue]
}
