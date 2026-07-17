import { useEffect, useId, useRef, useState } from "react"
import { useDebouncedValue } from "./useDebouncedValue"

export function DebouncedSearch() {

  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const [query, setQuery] = useState("")

  const debouncedQuery = useDebouncedValue(query, 300)

  return (
    <div>
      <label htmlFor={inputId}>Search</label>
      <input
        id={inputId}
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <p>Searching: {debouncedQuery}</p>
    </div>
  )
}
