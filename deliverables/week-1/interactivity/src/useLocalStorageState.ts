import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'

// TODO: initialize state from localStorage[key] (JSON-parsed) when present,
// otherwise from initialValue. Write JSON to localStorage on every change.
export function useLocalStorageState<T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    const stored = localStorage.getItem(key)
    return stored !== null ? (JSON.parse(stored) as T) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}
