import './theme.css'
import { ThemeProvider } from './ThemeProvider'
import { ThemeToggle } from './ThemeToggle'

const cards = [
  {
    title: 'Design tokens',
    body: 'Colors come from CSS variables, not hex literals.',
  },
  {
    title: 'Runtime theming',
    body: 'Toggle light/dark without a reload; choice is persisted.',
  },
  {
    title: 'Responsive layout',
    body: 'The grid reflows from 1 to 3 columns as the viewport grows.',
  },
]

// Runnable demo shown in the dev server.
export default function Demo() {
  return (
    <ThemeProvider>
      <div className="app">
        <header className="app__header">
          <h1>RAVN Styling</h1>
          <ThemeToggle />
        </header>
        <main className="app__content">
          <section className="app__grid">
            {cards.map((card) => (
              <article className="card" key={card.title}>
                <h2 className="card__title">{card.title}</h2>
                <p className="card__body">{card.body}</p>
              </article>
            ))}
          </section>
        </main>
      </div>
    </ThemeProvider>
  )
}
