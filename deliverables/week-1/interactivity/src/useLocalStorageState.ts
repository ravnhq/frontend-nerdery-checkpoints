import { useState, useEffect } from "react"

export function useLocalStorageState<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storage, setStorage] = useState<T>(() => {
    let value
    try {
      value = JSON.parse(window.localStorage.getItem(key) ?? 'null')
    }
    catch {
      console.warn(`Invalid JSON in localStorage[${key}], falling back to initialValue`)
    }
    return value ?? initialValue
  })
	useEffect(() => {
		window.localStorage.setItem(key, JSON.stringify(storage))
	}, [key, storage])
  const setValue = (value: T | ((prev: T) => T)): void => {
    if (typeof value === 'function'){
      setStorage(value as (prev: T) => T)
    }
    else{
      setStorage(value)
    }
  }
  return [storage, setValue]
}
