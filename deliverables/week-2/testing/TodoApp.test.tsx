import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

  it('adds a non-empty todo to the list', async () => {
    const user = userEvent.setup()
    const testTodo = 'Buy milk'
    render(<TodoApp />)
    await user.type(screen.getByLabelText(/new todo/i), testTodo)
    await user.click(screen.getByRole('button', { name: /add/i }))
    expect(screen.getByText(testTodo)).toBeInTheDocument()

  })

  it('ignores empty / whitespace-only input', async () => {
    const user = userEvent.setup()
    render(<TodoApp />)
    await user.type(screen.getByLabelText(/new todo/i), '   ')
    await user.click(screen.getByRole('button', { name: /add/i }))
    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
  })


  it('clears the input after adding', async () => {
    const user = userEvent.setup()
    const testTodo = 'Walk the dog'
    render(<TodoApp />)
    await user.type(screen.getByLabelText(/new todo/i), testTodo)
    await user.click(screen.getByRole('button', { name: /add/i }))
    expect(screen.getByLabelText(/new todo/i)).toHaveValue('')
  })

  it('toggles a todo completed via its checkbox', async () => {
    const user = userEvent.setup()
    const testTodo = 'Toggle this todo'
    render(<TodoApp />)
    await user.type(screen.getByLabelText(/new todo/i), testTodo)
    await user.click(screen.getByRole('button', { name: /add/i }))
    await user.click(screen.getByRole('checkbox', { name: testTodo }))
    expect(screen.getByRole('checkbox', { name: testTodo })).toBeChecked()

    await user.click(screen.getByRole('checkbox', { name: testTodo }))
    expect(screen.getByRole('checkbox', { name: testTodo })).not.toBeChecked()
  })
  
  it.todo('deletes a todo via its Delete button')
  it.todo('Active filter shows only not-completed todos')
  it.todo('Completed filter shows only completed todos')
  it.todo('All filter shows every todo again')
  it.todo('shows the count of active todos as "{n} left"')
})
