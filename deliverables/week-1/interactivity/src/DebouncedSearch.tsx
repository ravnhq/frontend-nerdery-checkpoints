import { useEffect, useId, useRef } from "react"
import { useDebouncedValue } from "./useDebouncedValue";
import { useLocalStorageState } from "./useLocalStorageState";


export function DebouncedSearch() {
  const [query, setQuery] = useLocalStorageState("search:query", "");
  const inputRef = useRef<HTMLInputElement>(null);
  const debounced = useDebouncedValue(query, 300);
  const id = useId();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div>
      <div className="field">
        <label htmlFor={id}>Search:</label>
        <input ref={inputRef} id={id} name="search" type="text" value={query} onChange={(e) => setQuery(e.target.value)}/>
      </div>
      <p className="search-status">Searching: {debounced}</p>
    </div>
  )
}
