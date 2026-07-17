import {useEffect,useId,useRef,useState} from 'react'
import {useDebouncedValue} from './useDebouncedValue'

export function DebouncedSearch() {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, 300);

  useEffect(() => { 
    inputRef.current?.focus();
  }, []);

  return (
    <div>
      <label htmlFor={inputId}>Search</label>
      <input
        id={inputId}
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <p>Searching: {debouncedQuery}</p>
    </div>
  );
}

