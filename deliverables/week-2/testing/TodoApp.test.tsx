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

  it('ignores empty / whitespace-only input', async () => {
    const user = userEvent.setup()
    render(<TodoApp />)

    await user.click(screen.getByRole('button', { name: /add/i }))
    await addTodo(user, '   ')

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
  })

  it('toggles a todo completed via its checkbox', async () => {
    const user = userEvent.setup()
    render(<TodoApp />)
    await addTodo(user, 'Buy milk')

    const checkbox = screen.getByRole('checkbox', { name: 'Buy milk' })
    await user.click(checkbox)
    expect(checkbox).toBeChecked()

    await user.click(checkbox)
    expect(checkbox).not.toBeChecked()
  })

  it('deletes a todo via its Delete button', async () => {
    const user = userEvent.setup()
    render(<TodoApp />)
    await addTodo(user, 'Buy milk')

    await user.click(screen.getByRole('button', { name: /delete buy milk/i }))

    expect(screen.queryByText('Buy milk')).not.toBeInTheDocument()
  })

  it('Active filter shows only not-completed todos', async () => {
    const user = userEvent.setup()
    render(<TodoApp />)
    await addTodo(user, 'Buy milk')
    await addTodo(user, 'Walk dog')
    await user.click(screen.getByRole('checkbox', { name: 'Buy milk' }))

    await user.click(screen.getByRole('button', { name: /^active$/i }))

    expect(screen.queryByText('Buy milk')).not.toBeInTheDocument()
    expect(screen.getByText('Walk dog')).toBeInTheDocument()
  })

  it('Completed filter shows only completed todos', async () => {
    const user = userEvent.setup()
    render(<TodoApp />)
    await addTodo(user, 'Buy milk')
    await addTodo(user, 'Walk dog')
    await user.click(screen.getByRole('checkbox', { name: 'Buy milk' }))

    await user.click(screen.getByRole('button', { name: /^completed$/i }))

    expect(screen.getByText('Buy milk')).toBeInTheDocument()
    expect(screen.queryByText('Walk dog')).not.toBeInTheDocument()
  })

  it('All filter shows every todo again', async () => {
    const user = userEvent.setup()
    render(<TodoApp />)
    await addTodo(user, 'Buy milk')
    await addTodo(user, 'Walk dog')
    await user.click(screen.getByRole('checkbox', { name: 'Buy milk' }))
    await user.click(screen.getByRole('button', { name: /^completed$/i }))

    await user.click(screen.getByRole('button', { name: /^all$/i }))

    expect(screen.getByText('Buy milk')).toBeInTheDocument()
    expect(screen.getByText('Walk dog')).toBeInTheDocument()
  })

  it('shows the count of active todos as "{n} left"', async () => {
    const user = userEvent.setup()
    render(<TodoApp />)

    expect(screen.getByText('0 left')).toBeInTheDocument()

    await addTodo(user, 'Buy milk')
    await addTodo(user, 'Walk dog')
    expect(screen.getByText('2 left')).toBeInTheDocument()

    await user.click(screen.getByRole('checkbox', { name: 'Buy milk' }))
    expect(screen.getByText('1 left')).toBeInTheDocument()
  })
})
