import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TodoApp } from './src/TodoApp'

function renderTodoApp() {
  const user = userEvent.setup()
  const utils = render(<TodoApp />)
  return { user, ...utils }
}

describe('TodoApp', () => {

  it('renders the new-todo input', () => {
    render(<TodoApp />)
    expect(screen.getByLabelText(/new todo/i)).toBeInTheDocument()
  })

  // Replace each placeholder below with a real test.
  // Tip: `const user = userEvent.setup()` then `await user.type(...)` /
  // `await user.click(...)`. Query by role/label, assert on what the user sees.

  it('adds a non-empty todo to the list', async () => {
    const { user } = renderTodoApp()
    const input = screen.getByLabelText(/new todo/i)
    const button = screen.getByRole('button', { name: /add/i })

    await user.type(input, 'Learn TypeScript')
    await user.click(button)

    expect(await screen.findByText('Learn TypeScript')).toBeInTheDocument()
  })

  it('ignores empty / whitespace-only input', async () => {
    const { user } = renderTodoApp()
    const input = screen.getByLabelText(/new todo/i)
    const button = screen.getByRole('button', { name: /add/i })

    await user.type(input, '   ')
    await user.click(button)

    expect(screen.queryAllByRole('checkbox')).toHaveLength(0)
  })

  it('clears the input after adding', async () => {
    const { user } = renderTodoApp()
    const input = screen.getByLabelText(/new todo/i)
    const button = screen.getByRole('button', { name: /add/i })

    await user.type(input, 'Learn TypeScript')
    await user.click(button)

    expect(input).toHaveValue('')
  })

  it('toggles a todo completed via its checkbox', async () => {
    const { user } = renderTodoApp()
    const input = screen.getByLabelText(/new todo/i)
    const button = screen.getByRole('button', { name: /add/i })

    await user.type(input, 'Learn TypeScript')
    await user.click(button)

    const checkbox = screen.getByRole('checkbox', { name: 'Learn TypeScript' })
    await user.click(checkbox)
    expect(checkbox).toBeChecked()

    await user.click(checkbox)
    expect(checkbox).not.toBeChecked()
  })

  it('deletes a todo via its Delete button', async () => {
    const { user } = renderTodoApp()
    const input = screen.getByLabelText(/new todo/i)
    const button = screen.getByRole('button', { name: /add/i })

    await user.type(input, 'Learn TypeScript')
    await user.click(button)

    const deleteButton = screen.getByRole('button', { name: /delete/i })
    await user.click(deleteButton)
    expect(screen.queryByText('Learn TypeScript')).not.toBeInTheDocument()
  })

  it('Active filter shows only not-completed todos', async () => {
    const { user } = renderTodoApp()
    const input = screen.getByLabelText(/new todo/i)
    const button = screen.getByRole('button', { name: /add/i })

    await user.type(input, 'Learn TypeScript')
    await user.click(button)

    await user.type(input, 'Learn JavaScript')
    await user.click(button)

    const checkbox = screen.getByRole('checkbox', { name: 'Learn TypeScript' })
    await user.click(checkbox)

    const activeFilter = screen.getByRole('button', { name: /active/i })
    await user.click(activeFilter)

    expect(screen.getByText('Learn JavaScript')).toBeInTheDocument()
    expect(screen.queryByText('Learn TypeScript')).not.toBeInTheDocument()
  })

  it('Completed filter shows only completed todos', async () => {
    const { user } = renderTodoApp()
    const input = screen.getByLabelText(/new todo/i)
    const button = screen.getByRole('button', { name: /add/i })

    await user.type(input, 'Learn TypeScript')
    await user.click(button)

    await user.type(input, 'Learn JavaScript')
    await user.click(button)

    const checkbox = screen.getByRole('checkbox', { name: 'Learn TypeScript' })
    await user.click(checkbox)


    const completedFilter = screen.getByRole('button', { name: /completed/i })
    await user.click(completedFilter)

    expect(screen.getByText('Learn TypeScript')).toBeInTheDocument()
    expect(screen.queryByText('Learn JavaScript')).not.toBeInTheDocument()
  })


  it('All filter shows every todo again', async () => {
    const { user } = renderTodoApp()
    const input = screen.getByLabelText(/new todo/i)
    const button = screen.getByRole('button', { name: /add/i })

    await user.type(input, 'Learn TypeScript')
    await user.click(button)

    await user.type(input, 'Learn JavaScript')
    await user.click(button)

    const checkbox = screen.getByRole('checkbox', { name: 'Learn TypeScript' })
    await user.click(checkbox)

    const allFilter = screen.getByRole('button', { name: /all/i })
    await user.click(allFilter)

    expect(screen.getByText('Learn TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Learn JavaScript')).toBeInTheDocument()
  })

  it('shows the count of active todos as "{n} left"', async () => {
    const { user } = renderTodoApp()
    const input = screen.getByLabelText(/new todo/i)
    const button = screen.getByRole('button', { name: /add/i })

    await user.type(input, 'Learn TypeScript')
    await user.click(button)

    const checkbox = screen.getByRole('checkbox', { name: 'Learn TypeScript' })
    await user.click(checkbox)

    await user.type(input, 'Learn JavaScript')
    await user.click(button)

    expect(screen.getByText('1 left')).toBeInTheDocument()
  })
})
