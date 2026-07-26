import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TodoApp } from './src/TodoApp'

async function addTodo(user: ReturnType<typeof userEvent.setup>, text: string) {
  await user.type(screen.getByLabelText(/new todo/i), text)
  await user.click(screen.getByRole('button', { name: /add/i }))
}

describe('TodoApp', () => {
  // Starter smoke test — this one already passes. Leave it or improve it.
  it('renders the new-todo input', () => {
    render(<TodoApp />)
    expect(screen.getByLabelText(/new todo/i)).toBeInTheDocument()
  })

  it('adds a non-empty todo to the list', async () => {
    const user = userEvent.setup()
    render(<TodoApp />)

    await addTodo(user, 'Buy milk')

    expect(screen.getByText('Buy milk')).toBeInTheDocument()
  })

  it('clears the input after adding', async () => {
    const user = userEvent.setup()
    render(<TodoApp />)

    await addTodo(user, 'Buy milk')

    expect(screen.getByLabelText(/new todo/i)).toHaveValue('')
  })

  // Replace each placeholder below with a real test.
  // Tip: `const user = userEvent.setup()` then `await user.type(...)` /
  // `await user.click(...)`. Query by role/label, assert on what the user sees.

  it.todo('ignores empty / whitespace-only input')
  it.todo('toggles a todo completed via its checkbox')
  it.todo('deletes a todo via its Delete button')
  it.todo('Active filter shows only not-completed todos')
  it.todo('Completed filter shows only completed todos')
  it.todo('All filter shows every todo again')
  it.todo('shows the count of active todos as "{n} left"')
})
