import {useId, useEffect, useRef} from 'react'
import { useDebouncedValue } from './useDebouncedValue'
import { useLocalStorageState } from './useLocalStorageState'

export function DebouncedSearch() {
  const [query, setQuery] = useLocalStorageState("main-search",'')
  const myinput = useRef<HTMLInputElement>(null)
  const id = useId()
  const query2 = useDebouncedValue<string>(query, 300)
  useEffect(() => {
    const {current } = myinput
    if (!current) return
    current.focus()
  }, [])
  return <div>
    <label htmlFor={id}> Search: </label>
    <input id={id} value={query} type="text" ref={myinput} onChange={(e)=> setQuery(e.currentTarget.value)}/>
    <p>Searching: {query2}</p>
  </div>
}
