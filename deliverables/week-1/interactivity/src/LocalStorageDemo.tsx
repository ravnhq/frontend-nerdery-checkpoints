import { useLocalStorageState } from './useLocalStorageState'

export function LocalStorageDemo() {
  const [name, setName] = useLocalStorageState('demo-name', '')

  return (
    <section style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>localStorage Demo</h2>
        <div>
          <label>
            <strong>Name: </strong>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Type your name..."
            />
          </label>
          <p style={{ margin: '0.25rem 0 0' }}>
            {name ? `Hello, ${name}!` : 'No name saved yet.'}
          </p>
        </div>
    </section>
  )
}
