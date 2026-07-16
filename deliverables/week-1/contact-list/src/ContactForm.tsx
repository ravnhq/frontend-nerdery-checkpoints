
import { useState } from 'react';
import type { NewContact } from './types'

// TODO: accessible form (labels for Name/Email/Role), validate on submit,
// call onAdd only when valid, show an error message when invalid.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function ContactForm({ onAdd }: { onAdd: (contact: NewContact) => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Name is required');
      return;
    }

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!EMAIL_PATTERN.test(email)) {
      setError('Invalid email format');
      return;
    }

    onAdd({ name, email, role });
    setName('');
    setEmail('');
    setRole('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="role">Role:</label>
        <input
          id="role"
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </div>
      {error && <p role="alert" style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Add Contact</button>
    </form>
  );
}
