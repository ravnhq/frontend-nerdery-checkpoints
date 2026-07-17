import { useEffect, useState } from "react"

export function useLocalStorageState<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {

  const [state, setValue] = useState<T>(() => {
    const item = window.localStorage.getItem(key)
    return item !== null ? JSON.parse(item) : initialValue
  })

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setValue]
}
