import { useState } from 'react';
import type { NewContact } from './types'

export function ContactForm({ onAdd }: { onAdd: (contact: NewContact) => void }) {

  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
  });

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (formData.name && formData.email.includes('@') && formData.email.includes('.') && formData.role) {
      onAdd(formData);
      setFormData({
        name: '',
        email: '',
        role: '',
      });
    } else {
      setError('Failed to save contact. Please try again.');
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  return <form onSubmit={handleFormSubmit}>

    <label>Name<input name="name" value={formData.name} onChange={handleInputChange} /> </label>
    <label>Email<input name="email" type="email" value={formData.email} onChange={handleInputChange} /> </label>
    <label>Role<input name="role" value={formData.role} onChange={handleInputChange} /> </label>
    {error && <p role="alert">{error}</p>}
    <button type="submit" >Add Contact</button>
    <button type="reset">Limpiar</button>

  </form>
}
