import { useLocalStorageState } from './useLocalStorageState'

export function LocalStorageDemo() {
  const [name, setName] = useLocalStorageState('demo-name', '')

  return (
    <section style={{ marginTop: '2rem' }}>
      <h2>localStorage Demo</h2>
      <label>
        Name:{' '}
        <input value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <p>{name ? `Hello, ${name}!` : 'No name saved yet.'}</p>
    </section>
  )
}
