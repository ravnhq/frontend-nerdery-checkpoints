import { useState } from 'react'

export function useLocalStorageState<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {

  const [value, setState] = useState<T>(() => {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
  })

  const setValue = (valueOrUpdater: T | ((prev: T) => T)): void => {
    setState((prev) => {
      const next =
        typeof valueOrUpdater === 'function'
          ? (valueOrUpdater as (prev: T) => T)(prev)
          : valueOrUpdater

      localStorage.setItem(key, JSON.stringify(next))
      return next
    })
  }
  
  return [value, setValue]
}
