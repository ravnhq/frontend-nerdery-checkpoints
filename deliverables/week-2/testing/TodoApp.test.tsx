import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TodoApp } from './src/TodoApp'

describe('TodoApp', () => {
  it('renders the new-todo input', () => {
    render(<TodoApp />)
    expect(screen.getByLabelText(/new todo/i)).toBeInTheDocument()
  })

  it('adds a non-empty todo to the list', async () => {
    const user = userEvent.setup()
    render(<TodoApp />)
    
    const input = screen.getByLabelText(/new todo/i)
    await user.type(input, 'Buy groceries')
    await user.click(screen.getByRole('button', { name: /add/i }))

    expect(screen.getByText('Buy groceries')).toBeInTheDocument()
  })

  it('ignores empty / whitespace-only input', async () => {
    const user = userEvent.setup()
    render(<TodoApp />)
    
    const input = screen.getByLabelText(/new todo/i)
    await user.type(input, '   ')
    await user.click(screen.getByRole('button', { name: /add/i }))

    expect(screen.getByText('0 left')).toBeInTheDocument()
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument()
  })

  it('clears the input after adding', async () => {
    const user = userEvent.setup()
    render(<TodoApp />)
    
    const input = screen.getByLabelText(/new todo/i)
    await user.type(input, 'Buy groceries')
    await user.click(screen.getByRole('button', { name: /add/i }))

    expect(input).toHaveValue('')
  })

  it('toggles a todo completed via its checkbox', async () => {
    const user = userEvent.setup()
    render(<TodoApp />)
    
    const input = screen.getByLabelText(/new todo/i)
    const addButton = screen.getByRole('button', { name: /add/i })
    
    await user.type(input, 'Review PRs')
    await user.click(addButton)

    const checkbox = screen.getByRole('checkbox', { name: 'Review PRs' })
    expect(checkbox).not.toBeChecked()

    await user.click(checkbox)
    expect(checkbox).toBeChecked()

    await user.click(checkbox)
    expect(checkbox).not.toBeChecked()
  })

  it('deletes a todo via its Delete button', async () => {
    const user = userEvent.setup()
    render(<TodoApp />)
    
    const input = screen.getByLabelText(/new todo/i)
    await user.type(input, 'Read documentation')
    await user.click(screen.getByRole('button', { name: /add/i }))

    const deleteButton = screen.getByRole('button', { name: 'Delete Read documentation' })
    await user.click(deleteButton)

    expect(screen.queryByText('Read documentation')).not.toBeInTheDocument()
  })

  it('Active filter shows only not-completed todos', async () => {
    const user = userEvent.setup()
    render(<TodoApp />)
    
    const input = screen.getByLabelText(/new todo/i)
    const addButton = screen.getByRole('button', { name: /add/i })

    await user.type(input, 'Task 1')
    await user.click(addButton)
    await user.type(input, 'Task 2')
    await user.click(addButton)

    await user.click(screen.getByRole('checkbox', { name: 'Task 1' }))

    await user.click(screen.getByRole('button', { name: 'Active' }))

    expect(screen.queryByText('Task 1')).not.toBeInTheDocument()
    expect(screen.getByText('Task 2')).toBeInTheDocument()
  })

  it('Completed filter shows only completed todos', async () => {
    const user = userEvent.setup()
    render(<TodoApp />)
    
    const input = screen.getByLabelText(/new todo/i)
    const addButton = screen.getByRole('button', { name: /add/i })

    await user.type(input, 'Task 1')
    await user.click(addButton)
    await user.type(input, 'Task 2')
    await user.click(addButton)

    await user.click(screen.getByRole('checkbox', { name: 'Task 1' }))

    await user.click(screen.getByRole('button', { name: 'Completed' }))

    expect(screen.getByText('Task 1')).toBeInTheDocument()
    expect(screen.queryByText('Task 2')).not.toBeInTheDocument()
  })

  it('All filter shows every todo again', async () => {
    const user = userEvent.setup()
    render(<TodoApp />)
    
    const input = screen.getByLabelText(/new todo/i)
    const addButton = screen.getByRole('button', { name: /add/i })

    await user.type(input, 'Task 1')
    await user.click(addButton)
    await user.type(input, 'Task 2')
    await user.click(addButton)

    await user.click(screen.getByRole('checkbox', { name: 'Task 1' }))
    
    await user.click(screen.getByRole('button', { name: 'Completed' }))
    await user.click(screen.getByRole('button', { name: 'All' }))

    expect(screen.getByText('Task 1')).toBeInTheDocument()
    expect(screen.getByText('Task 2')).toBeInTheDocument()
  })

  it('shows the count of active todos as "{n} left"', async () => {
    const user = userEvent.setup()
    render(<TodoApp />)
    
    const input = screen.getByLabelText(/new todo/i)
    const addButton = screen.getByRole('button', { name: /add/i })

    expect(screen.getByText('0 left')).toBeInTheDocument()

    await user.type(input, 'Task 1')
    await user.click(addButton)
    expect(screen.getByText('1 left')).toBeInTheDocument()

    await user.type(input, 'Task 2')
    await user.click(addButton)
    expect(screen.getByText('2 left')).toBeInTheDocument()

    await user.click(screen.getByRole('checkbox', { name: 'Task 1' }))
    expect(screen.getByText('1 left')).toBeInTheDocument()
  })
})