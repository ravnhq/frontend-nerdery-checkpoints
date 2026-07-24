import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'  // ← you'll want this
import { TodoApp } from './src/TodoApp'

describe('TodoApp', () => {

   it('renders the new-todo input', () => {
    render(<TodoApp />)
    expect(screen.getByLabelText(/new todo/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /completed/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /active/i })).toBeInTheDocument()
    expect(screen.getByText('0 left')).toBeInTheDocument()
  })

  // Replace each placeholder below with a real test.
  // Tip: `const user = userEvent.setup()` then `await user.type(...)` /
  // `await user.click(...)`. Query by role/label, assert on what the user sees.

  it.todo('adds a non-empty todo to the list')
  it.todo('ignores empty / whitespace-only input')
  it.todo('clears the input after adding')
  it.todo('toggles a todo completed via its checkbox')
  it.todo('deletes a todo via its Delete button')
  it.todo('Active filter shows only not-completed todos')
  it.todo('Completed filter shows only completed todos')
  it.todo('All filter shows every todo again')
  it.todo('shows the count of active todos as "{n} left"')
})
