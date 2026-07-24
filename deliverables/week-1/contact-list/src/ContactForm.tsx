import { useId, useReducer, type FormEvent } from 'react'
import { FieldLabel } from './FieldLabel'
import type { NewContact } from './types'
import './ContactForm.css'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Everyone in this directory is on the same domain, so the field takes a
// username and carries the domain for you.
const EMAIL_DOMAIN = 'ravn.co'
const ROLES = ['Engineer', 'Manager', 'Designer'] as const

interface FormState {
  name: string
  email: string
  role: string
  error: string | null
}

type FormAction =
  | { type: 'set-field'; field: 'name' | 'email' | 'role'; value: string }
  | { type: 'submit-error'; message: string }
  | { type: 'submit-success' }

const initialFormState: FormState = { name: '', email: '', role: ROLES[0], error: null }

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'set-field':
      return { ...state, [action.field]: action.value }
    case 'submit-error':
      return { ...state, error: action.message }
    case 'submit-success':
      return initialFormState
  }
}

// A value that already has an `@` (someone pasted a full address) is left
// alone; a bare username becomes `<name>@ravn.co`. Shared with the render
// logic below so the domain hint disappears exactly when this stops applying.
function hasExplicitDomain(raw: string): boolean {
  return raw.includes('@')
}

function resolveEmail(raw: string): string {
  const trimmed = raw.trim()
  return hasExplicitDomain(trimmed) ? trimmed : `${trimmed}@${EMAIL_DOMAIN}`
}

export function ContactForm({ onAdd }: { onAdd: (contact: NewContact) => void }) {
  const fieldId = useId()
  const [{ name, email, role, error }, dispatch] = useReducer(formReducer, initialFormState)
  const domainId = `${fieldId}-email-domain`
  const showDomainSuffix = !hasExplicitDomain(email)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!name.trim()) {
      dispatch({ type: 'submit-error', message: 'Name is required.' })
      return
    }
    const resolvedEmail = resolveEmail(email)
    if (!EMAIL_PATTERN.test(resolvedEmail)) {
      dispatch({ type: 'submit-error', message: 'Enter a valid email address.' })
      return
    }

    onAdd({ name: name.trim(), email: resolvedEmail, role })
    dispatch({ type: 'submit-success' })
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <h2 className="contact-form__title">New contact</h2>
      <div className="contact-form__field">
        <FieldLabel htmlFor={`${fieldId}-name`}>Name</FieldLabel>
        <input
          className="contact-form__input"
          id={`${fieldId}-name`}
          value={name}
          onChange={(event) => dispatch({ type: 'set-field', field: 'name', value: event.target.value })}
        />
      </div>
      <div className="contact-form__field">
        <FieldLabel htmlFor={`${fieldId}-email`}>Email</FieldLabel>
        <div className="contact-form__combo">
          <input
            className="contact-form__input contact-form__input--flush"
            id={`${fieldId}-email`}
            type="text"
            value={email}
            aria-describedby={showDomainSuffix ? domainId : undefined}
            onChange={(event) => dispatch({ type: 'set-field', field: 'email', value: event.target.value })}
          />
          {showDomainSuffix && (
            <span className="contact-form__suffix" id={domainId}>
              @{EMAIL_DOMAIN}
            </span>
          )}
        </div>
      </div>
      <div className="contact-form__field">
        <FieldLabel htmlFor={`${fieldId}-role`}>Role</FieldLabel>
        <div className="contact-form__select-wrap">
          <select
            className="contact-form__select"
            id={`${fieldId}-role`}
            value={role}
            onChange={(event) => dispatch({ type: 'set-field', field: 'role', value: event.target.value })}
          >
            {ROLES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      {error && (
        <p className="contact-form__error" role="alert">
          {error}
        </p>
      )}
      <button className="contact-form__submit" type="submit">
        Add
      </button>
    </form>
  )
}
