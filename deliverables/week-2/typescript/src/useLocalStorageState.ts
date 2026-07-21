import { useState, useEffect } from 'react';

export function useLocalStorageState<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  function setValue(value: T | ((prev: T) => T)): void {
    setState((prev) => (value instanceof Function ? value(prev) : value));
  }

  return [state, setValue];
}