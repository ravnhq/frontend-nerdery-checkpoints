import { useEffect, useId, useRef, useState } from 'react'
import { useDebouncedValue } from './useDebouncedValue'

export function DebouncedSearch() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebouncedValue(query, 300)
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div>
      <label htmlFor={inputId}>Search</label>
      <input
        id={inputId}
        ref={inputRef}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <p>Searching: {debouncedQuery}</p>
    </div>
  )
}
