import { useEffect, useId, useRef, useState } from 'react'
import { useDebouncedValue } from './useDebouncedValue'
import './DebouncedSearch.css'

export function DebouncedSearch() {
  const id = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const debounced = useDebouncedValue(query, 300)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div className="iact-search">
      <label className="iact-search__label" htmlFor={id}>
        Search
      </label>
      <input
        className="iact-search__input"
        id={id}
        ref={inputRef}
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <p className="iact-search__status">Searching: {debounced}</p>
    </div>
  )
}
