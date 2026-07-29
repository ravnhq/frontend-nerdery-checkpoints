import { useEffect, useState } from 'react'

function getItem<T>(key: string, value: T): T {
  try {
    const storedValue = localStorage.getItem(key)

    return storedValue ? JSON.parse(storedValue) : value
  } catch {
    return value
  }
}

export function useLocalStorageState<T>(
  key: string,
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [localStorageValue, setLocalStorageValue] = useState<T>(() => {
    return getItem(key, initialValue)
  })

  const [prevKey, setPrevKey] = useState(key)
  if (key !== prevKey) {
    setPrevKey(key)
    setLocalStorageValue(getItem(key, initialValue))
  }

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(localStorageValue))
  }, [key, localStorageValue])

  return [localStorageValue, setLocalStorageValue]
}
