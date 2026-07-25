import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'  // ← you'll want this
import { TodoApp } from './src/TodoApp'
import userEvent from '@testing-library/user-event'

describe('TodoApp', () => {
  // Starter smoke test — this one already passes. Leave it or improve it.
  it('renders the new-todo input', () => {
    render(<TodoApp />)
    expect(screen.getByLabelText(/new todo/i)).toBeInTheDocument()
  })

  // Replace each placeholder below with a real test.
  // Tip: `const user = userEvent.setup()` then `await user.type(...)` /
  // `await user.click(...)`. Query by role/label, assert on what the user sees.

  it('adds a non-empty todo to the list', async () => {
    const user = userEvent.setup()
    render(<TodoApp />)
    const input = screen.getByLabelText(/new todo/i)
    const button = screen.getByRole('button', { name: /add/i })
    await user.type(input, "Buy Potatoes")
    await user.click(button)
    expect(screen.getByText("Buy Potatoes")).toBeInTheDocument()
  })

  it('ignores empty / whitespace-only input', async () => {

    const user = userEvent.setup()
    render(<TodoApp />)
    const input = screen.getByLabelText(/new todo/i)
    const button = screen.getByRole('button', { name: /add/i })
    await user.type(input, "  ")
    await user.click(button)
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
  })

  it('clears the input after adding', async () => {
    const user = userEvent.setup()
    render(<TodoApp />)
    const input = screen.getByLabelText(/new todo/i)
    const button = screen.getByRole('button', { name: /add/i })
    await user.type(input, "pay credit card")
    await user.click(button)
    expect(screen.getByLabelText(/new todo/i)).toHaveValue("")
  })
  it('toggles a todo completed via its checkbox', async () => {
    const user = userEvent.setup()
    render(<TodoApp />)
    const input = screen.getByLabelText(/new todo/i)
    const button = screen.getByRole('button', { name: /add/i })
    await user.type(input, "pay credit card")
    await user.click(button)
    const checkbox = screen.getByRole('checkbox', { name: /pay credit card/i })
    await user.click(checkbox)
    expect(screen.getByRole('checkbox', { name: /pay credit card/i })).toBeChecked()
  })

  it('deletes a todo via its Delete button', async () => {
    const user = userEvent.setup()
    render(<TodoApp />)
    const input1 = screen.getByLabelText(/new todo/i)
    const addButton1 = screen.getByRole('button', { name: /add/i })
    await user.type(input1, "pay credit card")
    await user.click(addButton1)
    const input2 = screen.getByLabelText(/new todo/i)
    const addButton2 = screen.getByRole('button', { name: /add/i })
    await user.type(input2, "get some milk")
    await user.click(addButton2)
    const deleteButton = screen.getByRole('button', { name: /delete pay credit card/i })
    await user.click(deleteButton)
    expect(screen.queryByRole('listitem', { name: /pay credit card/i })).not.toBeInTheDocument()
    expect(screen.getByText('get some milk')).toBeInTheDocument()
  })

  it('Active filter shows only not-completed todos', async () => {
    const user = userEvent.setup()
    render(<TodoApp />)
    const input1 = screen.getByLabelText(/new todo/i)
    const addButton1 = screen.getByRole('button', { name: /add/i })
    await user.type(input1, "pay energy bill")
    await user.click(addButton1)
    const input2 = screen.getByLabelText(/new todo/i)
    const addButton2 = screen.getByRole('button', { name: /add/i })
    await user.type(input2, "call mom")
    await user.click(addButton2)
    const checkbox = screen.getByRole('checkbox', { name: /call mom/i })
    await user.click(checkbox)
    const filter = screen.getByRole('button', { name: /active/i })
    await user.click(filter)
    expect(screen.getByText("pay energy bill")).toBeInTheDocument()
    expect(screen.queryByText("call mom")).not.toBeInTheDocument()
  })

  it('Completed filter shows only completed todos', async () => {
    const user = userEvent.setup()
    render(<TodoApp />)
    const input1 = screen.getByLabelText(/new todo/i)
    const addButton1 = screen.getByRole('button', { name: /add/i })
    await user.type(input1, "pay energy bill")
    await user.click(addButton1)
    const input2 = screen.getByLabelText(/new todo/i)
    const addButton2 = screen.getByRole('button', { name: /add/i })
    await user.type(input2, "call mom")
    await user.click(addButton2)
    const checkbox = screen.getByRole('checkbox', { name: /call mom/i })
    await user.click(checkbox)
    const filter = screen.getByRole('button', { name: /completed/i })
    await user.click(filter)
    expect(screen.getByText("call mom")).toBeInTheDocument()
    expect(screen.queryByText("pay energy bill")).not.toBeInTheDocument()
  })
  it('All filter shows every todo again', async () => {
    const user = userEvent.setup()
    render(<TodoApp />)
    const input1 = screen.getByLabelText(/new todo/i)
    const addButton1 = screen.getByRole('button', { name: /add/i })
    await user.type(input1, "pay energy bill")
    await user.click(addButton1)
    const input2 = screen.getByLabelText(/new todo/i)
    const addButton2 = screen.getByRole('button', { name: /add/i })
    await user.type(input2, "call mom")
    await user.click(addButton2)
    const checkbox = screen.getByRole('checkbox', { name: /call mom/i })
    await user.click(checkbox)
    const filter = screen.getByRole('button', { name: /active/i })
    await user.click(filter)
    const noFilter = screen.getByRole('button', { name: /all/i })
    await user.click(noFilter)
    expect(screen.getByText("pay energy bill")).toBeInTheDocument()
    expect(screen.getByText("call mom")).toBeInTheDocument()
  })

  it('shows the count of active todos as "{n} left"', async () => {
    const user = userEvent.setup()
    render(<TodoApp />)
    const input1 = screen.getByLabelText(/new todo/i)
    const addButton1 = screen.getByRole('button', { name: /add/i })
    await user.type(input1, "pay netflix subscription")
    await user.click(addButton1)
    const input2 = screen.getByLabelText(/new todo/i)
    const addButton2 = screen.getByRole('button', { name: /add/i })
    await user.type(input2, "call the bank")
    await user.click(addButton2)
    expect(screen.getByText("2 left")).toBeInTheDocument()
    const checkbox = screen.getByRole('checkbox', { name: /call the bank/i })
    await user.click(checkbox)
    expect(screen.getByText("1 left")).toBeInTheDocument()
  })
})
