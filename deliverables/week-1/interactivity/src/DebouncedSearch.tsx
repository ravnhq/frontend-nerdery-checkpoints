import { useEffect, useId, useRef, useState } from 'react'
import { useDebouncedValue } from './useDebouncedValue'
import './DebouncedSearch.css'

export function DebouncedSearch() {
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState<string>('')

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const debouncedValue = useDebouncedValue(query, 300)

  return (
    <section className="debounced-search">
      <label htmlFor={inputId}>Search</label>
      <input
        id={inputId}
        type="text"
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      ></input>
      <span>Searching: {debouncedValue}</span>
    </section>
  )
}
