import React from "react"
import { useEffect, useState } from "react"
import { useDebouncedValue } from "./useDebouncedValue"
// TODO: render a text input labelled "Search" (associate the label with useId),
// auto-focus it on mount (useRef + focus in an effect), and show the DEBOUNCED
// query as text `Searching: {debounced}` using useDebouncedValue(query, 300).
export function DebouncedSearch() {
  const [query, setQuery] = useState("")
  const uniqueId = React.useId()
  const input = React.useRef<HTMLInputElement>(null)
  const debounced = useDebouncedValue(query, 300)
  useEffect(() => {
    const inputElement = input.current
    inputElement?.focus()
  }, [])

  return (
    <div>
      <label htmlFor={uniqueId}>Search</label>
      <input
        id={uniqueId}
        value={query}
        ref={input}
        onChange={(e) => setQuery(e.target.value)}
      />
      <p>Searching: {debounced}</p>
    </div>
  )
}





