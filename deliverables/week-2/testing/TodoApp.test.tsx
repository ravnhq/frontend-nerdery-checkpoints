import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent, { type UserEvent } from '@testing-library/user-event'
import { TodoApp } from './src/TodoApp'

async function addTodo(user: UserEvent, text: string) {
  await user.type(screen.getByLabelText(/new todo/i), text)
  await user.click(screen.getByRole('button', { name: 'Add' }))
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

    expect(screen.getByRole('checkbox', { name: 'Buy milk' })).toBeInTheDocument()
  })

  it('ignores empty and whitespace-only input', async () => {
    const user = userEvent.setup()
    render(<TodoApp />)

    await user.click(screen.getByRole('button', { name: 'Add' }))
    await addTodo(user, '   ')

    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
  })

  it('clears the input after adding', async () => {
    const user = userEvent.setup()
    render(<TodoApp />)

    await addTodo(user, 'Buy milk')

    expect(screen.getByLabelText(/new todo/i)).toHaveValue('')
  })

  it('toggles a todo completed via its checkbox', async () => {
    const user = userEvent.setup()
    render(<TodoApp />)
    await addTodo(user, 'Buy milk')
    await addTodo(user, 'Walk dog')

    const milk = screen.getByRole('checkbox', { name: 'Buy milk' })
    const dog = screen.getByRole('checkbox', { name: 'Walk dog' })

    await user.click(milk)
    expect(milk).toBeChecked()
    expect(dog).not.toBeChecked()

    await user.click(milk)
    expect(milk).not.toBeChecked()
  })

  it('deletes a todo via its Delete button', async () => {
    const user = userEvent.setup()
    render(<TodoApp />)
    await addTodo(user, 'Buy milk')

    await user.click(screen.getByRole('button', { name: 'Delete Buy milk' }))

    expect(screen.queryByRole('checkbox', { name: 'Buy milk' })).not.toBeInTheDocument()
  })

  it('Active filter shows only not-completed todos', async () => {
    const user = userEvent.setup()
    render(<TodoApp />)
    await addTodo(user, 'Buy milk')
    await addTodo(user, 'Walk dog')
    await user.click(screen.getByRole('checkbox', { name: 'Buy milk' }))

    await user.click(screen.getByRole('button', { name: 'Active' }))

    expect(screen.getByRole('checkbox', { name: 'Walk dog' })).toBeInTheDocument()
    expect(screen.queryByRole('checkbox', { name: 'Buy milk' })).not.toBeInTheDocument()
  })

  it('Completed filter shows only completed todos', async () => {
    const user = userEvent.setup()
    render(<TodoApp />)
    await addTodo(user, 'Buy milk')
    await addTodo(user, 'Walk dog')
    await user.click(screen.getByRole('checkbox', { name: 'Buy milk' }))

    await user.click(screen.getByRole('button', { name: 'Completed' }))

    expect(screen.getByRole('checkbox', { name: 'Buy milk' })).toBeInTheDocument()
    expect(screen.queryByRole('checkbox', { name: 'Walk dog' })).not.toBeInTheDocument()
  })

  it('All filter shows every todo again', async () => {
    const user = userEvent.setup()
    render(<TodoApp />)
    await addTodo(user, 'Buy milk')
    await addTodo(user, 'Walk dog')
    await user.click(screen.getByRole('checkbox', { name: 'Buy milk' }))
    await user.click(screen.getByRole('button', { name: 'Completed' }))

    await user.click(screen.getByRole('button', { name: 'All' }))

    expect(screen.getByRole('checkbox', { name: 'Buy milk' })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'Walk dog' })).toBeInTheDocument()
  })

  it('shows the count of active todos as "{n} left" and updates as todos change', async () => {
    const user = userEvent.setup()
    render(<TodoApp />)

    await addTodo(user, 'Buy milk')
    await addTodo(user, 'Walk dog')
    expect(screen.getByText('2 left')).toBeInTheDocument()

    await user.click(screen.getByRole('checkbox', { name: 'Buy milk' }))
    expect(screen.getByText('1 left')).toBeInTheDocument()

    await user.click(screen.getByRole('checkbox', { name: 'Walk dog' }))
    expect(screen.getByText('0 left')).toBeInTheDocument()
  })
})
