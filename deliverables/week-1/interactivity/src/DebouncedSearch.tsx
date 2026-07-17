import { useState, useId, useRef, useEffect } from 'react'
import { useDebouncedValue } from './useDebouncedValue'

// TODO: render a text input labelled "Search" (associate the label with useId),
// auto-focus it on mount (useRef + focus in an effect), and show the DEBOUNCED
// query as text `Searching: {debounced}` using useDebouncedValue(query, 300).
export function DebouncedSearch() {
  const [query, setQuery] = useState('')
  const debounced = useDebouncedValue(query, 300)
  const id = useId()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div>
      <label htmlFor={id}>Search</label>
      <input
        id={id}
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <p>Searching: {debounced}</p>
    </div>
  )
}

