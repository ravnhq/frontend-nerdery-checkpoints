import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TodoApp } from './src/TodoApp'

function setup() {
  const user = userEvent.setup()

  render(<TodoApp />)

  const input = screen.getByLabelText(/new todo/i)
  const addButton = screen.getByRole('button', { name: /add/i })

  async function addTodo(text: string) {
    if (text.length > 0) {
      await user.type(input, text)
    }

    await user.click(addButton)
  }

  async function submitTodo(text: string) {
    await user.type(input, `${text}{Enter}`)
  }

  async function toggleTodo(text: string) {
    const checkbox = screen.getByRole('checkbox', {
      name: text,
    })

    await user.click(checkbox)
  }

  async function deleteTodo(text: string) {
    const deleteButton = screen.getByRole('button', {
      name: `Delete ${text}`,
    })

    await user.click(deleteButton)
  }

  async function selectFilter(filter: 'All' | 'Active' | 'Completed') {
    const filterButton = screen.getByRole('button', {
      name: filter,
    })

    await user.click(filterButton)
  }

  function getTodo(text: string) {
    return screen.getByText(text)
  }

  function queryTodo(text: string) {
    return screen.queryByText(text)
  }

  function getTodoCheckbox(text: string) {
    return screen.getByRole('checkbox', {
      name: text,
    })
  }

  function getActiveCount(count: number) {
    return screen.getByText(`${count} left`)
  }

  function getTodoItems() {
    return screen.queryAllByRole('listitem')
  }

  return {
    input,
    addTodo,
    submitTodo,
    toggleTodo,
    deleteTodo,
    selectFilter,
    getTodo,
    queryTodo,
    getTodoCheckbox,
    getActiveCount,
    getTodoItems,
  }
}

describe('TodoApp', () => {
  it('renders the new-todo input', () => {
    const { input } = setup()

    expect(input).toBeInTheDocument()
  })

  it('adds a non-empty todo to the list', async () => {
    const { addTodo, getTodo } = setup()

    await addTodo('Pruebita')

    expect(getTodo('Pruebita')).toBeInTheDocument()
  })

  it('adds a todo when submitting the form with Enter', async () => {
    const { input, submitTodo, getTodo } = setup()

    await submitTodo('Write tests')

    expect(getTodo('Write tests')).toBeInTheDocument()
    expect(input).toHaveValue('')
  })

  it('ignores empty / whitespace-only input', async () => {
    const { addTodo, getTodoItems } = setup()

    await addTodo('')

    expect(getTodoItems()).toHaveLength(0)

    await addTodo('   ')

    expect(getTodoItems()).toHaveLength(0)
  })

  it('clears the input after adding', async () => {
    const { input, addTodo } = setup()

    await addTodo('Pruebita')

    expect(input).toHaveValue('')
  })

  it('toggles a todo completed via its checkbox', async () => {
    const { addTodo, toggleTodo, getTodoCheckbox } = setup()

    await addTodo('Pruebita')

    const checkbox = getTodoCheckbox('Pruebita')

    expect(checkbox).not.toBeChecked()

    await toggleTodo('Pruebita')

    expect(checkbox).toBeChecked()

    await toggleTodo('Pruebita')

    expect(checkbox).not.toBeChecked()
  })

  it('deletes a todo via its Delete button', async () => {
    const { addTodo, deleteTodo, getTodo, queryTodo } = setup()

    await addTodo('Pruebita')

    expect(getTodo('Pruebita')).toBeInTheDocument()

    await deleteTodo('Pruebita')

    expect(queryTodo('Pruebita')).not.toBeInTheDocument()
  })

  it('Active filter shows only not-completed todos', async () => {
    const { addTodo, toggleTodo, selectFilter, getTodo, queryTodo } = setup()

    await addTodo('Task A')
    await addTodo('Task B')

    await toggleTodo('Task A')
    await selectFilter('Active')

    expect(queryTodo('Task A')).not.toBeInTheDocument()
    expect(getTodo('Task B')).toBeInTheDocument()
  })

  it('Completed filter shows only completed todos', async () => {
    const { addTodo, toggleTodo, selectFilter, getTodo, queryTodo } = setup()

    await addTodo('Task A')
    await addTodo('Task B')

    await toggleTodo('Task A')
    await selectFilter('Completed')

    expect(getTodo('Task A')).toBeInTheDocument()
    expect(queryTodo('Task B')).not.toBeInTheDocument()
  })

  it('All filter shows every todo again', async () => {
    const { addTodo, toggleTodo, selectFilter, getTodo } = setup()

    await addTodo('Task A')
    await addTodo('Task B')

    await toggleTodo('Task A')

    await selectFilter('Completed')
    await selectFilter('All')

    expect(getTodo('Task A')).toBeInTheDocument()
    expect(getTodo('Task B')).toBeInTheDocument()
  })

  it('shows the count of active todos as "{n} left"', async () => {
    const { addTodo, toggleTodo, getActiveCount } = setup()

    expect(getActiveCount(0)).toBeInTheDocument()

    await addTodo('Task A')
    await addTodo('Task B')

    expect(getActiveCount(2)).toBeInTheDocument()

    await toggleTodo('Task A')

    expect(getActiveCount(1)).toBeInTheDocument()
  })
})
