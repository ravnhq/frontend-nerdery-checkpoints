import React from "react"
// `value` stops changing. Use useState + useEffect with setTimeout, and clear
// the timeout in the effect cleanup so rapid changes reset the timer.
export function useDebouncedValue<T>(value: T, delayMs: number): T {

  const [debouncedValue, setDebouncedValue] = React.useState(value)

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delayMs)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delayMs])

  return debouncedValue
}
