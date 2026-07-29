import { useState } from "react"
// TODO: initialize state from localStorage[key] (JSON-parsed) when present,
// otherwise from initialValue. Write JSON to localStorage on every change.
export function useLocalStorageState<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const [value, setStoredValue] = useState<T>(() => {
    const item = localStorage.getItem(key)
    if (item !== null) return JSON.parse(item)
    return initialValue
  })


  const setValue = (newValue: T | ((prev: T) => T)) => {
    setStoredValue((prev) => {
      const resolved = typeof newValue === "function" ? (newValue as (prev: T) => T)(prev) : newValue
      localStorage.setItem(key, JSON.stringify(resolved))
      return resolved
    })
  }
  return [value, setValue]

}

