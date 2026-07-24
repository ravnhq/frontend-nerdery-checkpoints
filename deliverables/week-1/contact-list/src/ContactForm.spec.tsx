import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContactForm } from './ContactForm'

// Unit coverage for the behaviour added on top of the acceptance spec
// (contact-list.test.tsx): the email domain shortcut and the role dropdown.
// Named `.spec.tsx` to stay distinct from the frozen `.test.tsx` acceptance spec.
describe('ContactForm', () => {
  it('appends the company domain when only a username is given', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()
    render(<ContactForm onAdd={onAdd} />)

    await user.type(screen.getByLabelText(/name/i), 'Barbara Liskov')
    await user.type(screen.getByLabelText(/email/i), 'barbara')
    await user.click(screen.getByRole('button', { name: /add/i }))

    expect(onAdd).toHaveBeenCalledWith({
      name: 'Barbara Liskov',
      email: 'barbara@ravn.co',
      role: 'Engineer',
    })
  })

  it('keeps a full address as typed instead of doubling the domain', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()
    render(<ContactForm onAdd={onAdd} />)

    await user.type(screen.getByLabelText(/name/i), 'External Guest')
    await user.type(screen.getByLabelText(/email/i), 'guest@example.com')
    await user.click(screen.getByRole('button', { name: /add/i }))

    expect(onAdd).toHaveBeenCalledWith(expect.objectContaining({ email: 'guest@example.com' }))
  })

  it('defaults the role to the first option', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()
    render(<ContactForm onAdd={onAdd} />)

    await user.type(screen.getByLabelText(/name/i), 'Ada Lovelace')
    await user.type(screen.getByLabelText(/email/i), 'ada')
    await user.click(screen.getByRole('button', { name: /add/i }))

    expect(onAdd).toHaveBeenCalledWith(expect.objectContaining({ role: 'Engineer' }))
  })

  it('submits the role chosen from the dropdown', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()
    render(<ContactForm onAdd={onAdd} />)

    await user.type(screen.getByLabelText(/name/i), 'Grace Hopper')
    await user.type(screen.getByLabelText(/email/i), 'grace')
    await user.selectOptions(screen.getByLabelText(/role/i), 'Manager')
    await user.click(screen.getByRole('button', { name: /add/i }))

    expect(onAdd).toHaveBeenCalledWith(expect.objectContaining({ role: 'Manager' }))
  })

  it('rejects an empty email — the domain alone is not a valid address', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()
    render(<ContactForm onAdd={onAdd} />)

    await user.type(screen.getByLabelText(/name/i), 'No Email')
    await user.click(screen.getByRole('button', { name: /add/i }))

    expect(onAdd).not.toHaveBeenCalled()
    expect(screen.getByRole('alert')).toHaveTextContent(/valid email/i)
  })

  it('clears the fields after a successful add', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()
    render(<ContactForm onAdd={onAdd} />)

    await user.type(screen.getByLabelText(/name/i), 'Katherine Johnson')
    await user.type(screen.getByLabelText(/email/i), 'katherine')
    await user.click(screen.getByRole('button', { name: /add/i }))

    expect(screen.getByLabelText(/name/i)).toHaveValue('')
    expect(screen.getByLabelText(/email/i)).toHaveValue('')
  })
})
