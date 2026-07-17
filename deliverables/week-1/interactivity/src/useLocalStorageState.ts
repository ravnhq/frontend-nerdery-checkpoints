import { useEffect, useState } from "react";


export function useLocalStorageState<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw == null ? initialValue : (JSON.parse(raw) as T);
    } catch {
      return initialValue;
    }
  })


  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      console.error("Error");
    }
  }, [key, state])

  return [state, setState]
}
