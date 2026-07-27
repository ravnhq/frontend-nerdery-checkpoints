import { BorderBeam } from 'border-beam'
import { TodoApp } from './TodoApp'
import './TodoApp.css'

// Runnable demo shown in the dev server.
export default function Demo() {
  return (
    <BorderBeam
      size="md"
      colorVariant="sunset"
      theme="dark"
      duration={4}
      strength={0.7}
    >
    <main className="testing-page">
      <h1>Testing module — Todo App</h1>
      <TodoApp />
    </main>
    </BorderBeam>
  )
}
