import { useReducer, useState } from 'react'
import './TodoApp.css'

// ---------------------------------------------------------------------------
// This component is PROVIDED and CORRECT. Do not change its behaviour.
// Styling-only className/import additions below — no attribute, text, or
// structural changes, so TodoApp.test.tsx keeps passing unmodified.
// ---------------------------------------------------------------------------

type Filter = 'all' | 'active' | 'completed'

interface Todo {
  id: number
  text: string
  completed: boolean
}

type Action =
  | { type: 'add'; text: string }
  | { type: 'toggle'; id: number }
  | { type: 'delete'; id: number }

let nextId = 1

function reducer(todos: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'add':
      return [...todos, { id: nextId++, text: action.text, completed: false }]
    case 'toggle':
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo,
      )
    case 'delete':
      return todos.filter((todo) => todo.id !== action.id)
    default:
      return todos
  }
}

function visibleTodos(todos: Todo[], filter: Filter): Todo[] {
  switch (filter) {
    case 'active':
      return todos.filter((todo) => !todo.completed)
    case 'completed':
      return todos.filter((todo) => todo.completed)
    default:
      return todos
  }
}

export function TodoApp() {
  const [todos, dispatch] = useReducer(reducer, [])
  const [draft, setDraft] = useState('')
  const [filter, setFilter] = useState<Filter>('all')

  function handleAdd() {
    const text = draft.trim()
    if (text === '') return // empty-input guard
    dispatch({ type: 'add', text })
    setDraft('')
  }

  const shown = visibleTodos(todos, filter)
  const remaining = todos.filter((todo) => !todo.completed).length

  return (
    <section className="todo">
      <h2 className="todo__heading">Todos</h2>

      <form
        className="todo__form"
        onSubmit={(event) => {
          event.preventDefault()
          handleAdd()
        }}
      >
        <label className="todo__label" htmlFor="new-todo">
          New todo
        </label>
        <input
          id="new-todo"
          className="todo__input"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />
        <button type="submit" className="todo__submit">
          Add
        </button>
      </form>

      <div role="group" aria-label="Filter todos" className="todo__filters">
        <button
          type="button"
          className="todo__filter"
          aria-pressed={filter === 'all'}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          type="button"
          className="todo__filter"
          aria-pressed={filter === 'active'}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button
          type="button"
          className="todo__filter"
          aria-pressed={filter === 'completed'}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      <p className="todo__count">{remaining} left</p>

      <ul className="todo__list">
        {shown.map((todo) => (
          <li key={todo.id} className="todo__item">
            <label className="todo__checkbox-label">
              <input
                type="checkbox"
                className="todo__checkbox"
                checked={todo.completed}
                aria-label={todo.text}
                onChange={() => dispatch({ type: 'toggle', id: todo.id })}
              />
              <span className="todo__text">{todo.text}</span>
            </label>
            <button
              type="button"
              className="todo__delete"
              onClick={() => dispatch({ type: 'delete', id: todo.id })}
            >
              Delete {todo.text}
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
