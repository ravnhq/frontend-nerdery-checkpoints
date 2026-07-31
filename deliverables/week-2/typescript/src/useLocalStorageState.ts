import { useCallback, useMemo, useState } from 'react'

export function useLocalStorageState<T>(
  _key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const [value, _setValue] = useState<T>(() => {
    let val = initialValue
    try { 
      val = JSON.parse(localStorage.getItem(_key)?? 'null')
      if(val===null) val=initialValue
    }
    catch {
      console.warn(`Invalid JSON in localStorage[${_key}], falling back to initialValue`)
    }
    return val
  })

  type SetStateAction<T> = T | ((prev: T) => T)
  type SetValue<T> = (value: SetStateAction<T>) => void

  const setValue = useCallback<SetValue<T>>((next) => {
    _setValue(prev => {
      const nextValue =
        typeof next === 'function'
          ? (next as (prev: T) => T)(prev)
          : next

      localStorage.setItem(_key, JSON.stringify(nextValue))

      return nextValue
    })
  }, [_key])
  return useMemo(
    () => [value, setValue] as [T, SetValue<T>],
    [value, setValue],
  )
}
