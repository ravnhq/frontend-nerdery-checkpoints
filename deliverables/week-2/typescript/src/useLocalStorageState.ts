import { useState, useCallback, useEffect } from "react";

// A reusable GENERIC hook. `<T>` lets it store any shape (number, object, …)
// while keeping the value and setter fully typed at each call site.
//
// TODO:
//   - hydrate the initial value from localStorage[key] (fall back to initialValue)
//   - persist the value to localStorage on every change
//   - support both `setValue(next)` and `setValue(prev => next)` forms
export function useLocalStorageState<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored !== null ? (JSON.parse(stored) as T) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    setState((prev) => {
      return typeof value === "function"
        ? (value as (prev: T) => T)(prev)
        : value;
    });
  }, []);

  return [state, setValue];
}
