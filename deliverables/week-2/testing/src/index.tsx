import { TodoApp } from './TodoApp'
import './index.css'

// Runnable demo shown in the dev server.
export default function Demo() {
  return (
    <main className="todo-demo">
      <div className="todo-demo__inner">
        <header className="todo-demo__masthead">
          <h1 className="todo-demo__title">Testing module — Todo App</h1>
        </header>
        <TodoApp />
      </div>
    </main>
  )
}
