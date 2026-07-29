import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TodoApp } from './src/TodoApp'

async function addTwoTodos(
  user: ReturnType<typeof userEvent.setup>,
  input: HTMLElement,
  addButton: HTMLElement,
): Promise<{
  activeTodo: HTMLElement
  completedTodo: HTMLElement
}> {
  await user.type(input, 'This is an active todo note')
  await user.click(addButton)

  await user.type(input, 'This is a completed todo note')
  await user.click(addButton)

  const items = screen.getAllByRole('listitem')

  const activeTodo = within(items[0]).getByRole('checkbox', {
    name: /this is an active todo note/i,
  })

  const completedTodo = within(items[1]).getByRole('checkbox', {
    name: /this is a completed todo note/i,
  })

  await user.click(completedTodo)
  expect(completedTodo).toBeChecked()

  return { activeTodo, completedTodo }
}

describe('TodoApp', () => {
  let input: HTMLElement
  let user: ReturnType<typeof userEvent.setup>
  let addButton: HTMLElement

  beforeEach(() => {
    render(<TodoApp />)
    input = screen.getByLabelText(/new todo/i)
    user = userEvent.setup()
    addButton = screen.getByRole('button', { name: /add/i })
  })

  it('renders the new-todo input', () => {
    expect(screen.getByLabelText(/new todo/i)).toBeInTheDocument()
  })

  it('adds a non-empty todo to the list', async () => {
    await user.type(input, 'This is a todo note')
    expect(input).toHaveValue('This is a todo note')

    await user.click(addButton)

    const createdTodo = within(screen.getByRole('listitem')).getByRole(
      'checkbox',
      {
        name: /this is a todo note/i,
      },
    )

    expect(createdTodo).toBeInTheDocument()
  })

  it('ignores empty / whitespace-only input', async () => {
    await user.click(addButton)

    let emptyListItem = screen.queryByRole('listitem')

    let emptyTodo = emptyListItem
      ? within(emptyListItem).queryByRole('checkbox', { name: '' })
      : null

    expect(emptyTodo).not.toBeInTheDocument()

    await user.type(input, ' ')
    expect(input).toHaveValue(' ')

    await user.click(addButton)

    emptyListItem = screen.queryByRole('listitem')

    emptyTodo = emptyListItem
      ? within(emptyListItem).queryByRole('checkbox', { name: '' })
      : null

    expect(emptyTodo).not.toBeInTheDocument()
  })

  it('clears the input after adding', async () => {
    await user.type(input, 'This is a todo note')
    expect(input).toHaveValue('This is a todo note')

    await user.click(addButton)

    expect(input).toHaveValue('')
  })

  it('toggles a todo completed via its checkbox', async () => {
    await user.type(input, 'This is a todo note')
    expect(input).toHaveValue('This is a todo note')

    await user.click(addButton)

    const createdTodoCheckbox = within(screen.getByRole('listitem')).getByRole(
      'checkbox',
      {
        name: /this is a todo note/i,
      },
    )

    await user.click(createdTodoCheckbox)
    expect(createdTodoCheckbox).toBeChecked()

    await user.click(createdTodoCheckbox)
    expect(createdTodoCheckbox).not.toBeChecked()
  })

  it('deletes a todo via its Delete button', async () => {
    await user.type(input, 'This is a todo note')
    expect(input).toHaveValue('This is a todo note')

    await user.click(addButton)

    const createdTodo = within(screen.getByRole('listitem')).getByRole(
      'checkbox',
      {
        name: /this is a todo note/i,
      },
    )

    const deleteTodoButton = screen.getByRole('button', {
      name: /Delete this is a todo note/i,
    })

    await user.click(deleteTodoButton)

    expect(createdTodo).not.toBeInTheDocument()
  })

  it('Active filter shows only not-completed todos', async () => {
    const { activeTodo, completedTodo } = await addTwoTodos(
      user,
      input,
      addButton,
    )

    expect(activeTodo).toBeInTheDocument()
    expect(completedTodo).toBeInTheDocument()

    const activeFilterButton = screen.getByRole('button', {
      name: 'Active',
    })
    await user.click(activeFilterButton)

    expect(completedTodo).not.toBeInTheDocument()
    expect(activeTodo).toBeInTheDocument()
  })

  it('Completed filter shows only completed todos', async () => {
    const { activeTodo, completedTodo } = await addTwoTodos(
      user,
      input,
      addButton,
    )

    expect(activeTodo).toBeInTheDocument()
    expect(completedTodo).toBeInTheDocument()

    const completedFilterButton = screen.getByRole('button', {
      name: 'Completed',
    })
    await user.click(completedFilterButton)

    expect(completedTodo).toBeInTheDocument()
    expect(activeTodo).not.toBeInTheDocument()
  })

  it('All filter shows every todo again', async () => {
    const { activeTodo, completedTodo } = await addTwoTodos(
      user,
      input,
      addButton,
    )

    expect(activeTodo).toBeInTheDocument()
    expect(completedTodo).toBeInTheDocument()

    const activeFilterButton = screen.getByRole('button', {
      name: 'Active',
    })
    await user.click(activeFilterButton)

    expect(completedTodo).not.toBeInTheDocument()
    expect(activeTodo).toBeInTheDocument()

    const allFilterButton = screen.getByRole('button', {
      name: 'All',
    })
    await user.click(allFilterButton)

    const items = screen.getAllByRole('listitem')

    const newCompletedTodo = within(items[1]).getByRole('checkbox', {
      name: /this is a completed todo note/i,
    })

    expect(activeTodo).toBeInTheDocument()
    expect(newCompletedTodo).toBeInTheDocument()
  })

  it('shows the count of active todos as "{n} left"', async () => {
    let count = screen.getByText(/0 left/i)
    expect(count).toBeInTheDocument()

    await user.type(input, 'First todo')
    expect(input).toHaveValue('First todo')

    await user.click(addButton)

    const firstTodo = within(screen.getByRole('listitem')).getByRole(
      'checkbox',
      {
        name: /first todo/i,
      },
    )
    expect(firstTodo).toBeInTheDocument()

    count = screen.getByText(/1 left/i)
    expect(count).toBeInTheDocument()

    await user.type(input, 'Second todo')
    expect(input).toHaveValue('Second todo')

    await user.click(addButton)

    const items = screen.getAllByRole('listitem')

    const secondTodo = within(items[1]).getByRole('checkbox', {
      name: /second todo/i,
    })

    expect(secondTodo).toBeInTheDocument()

    count = screen.getByText(/2 left/i)
    expect(count).toBeInTheDocument()

    await user.click(secondTodo)

    count = screen.getByText(/1 left/i)
    expect(count).toBeInTheDocument()
  })
})
