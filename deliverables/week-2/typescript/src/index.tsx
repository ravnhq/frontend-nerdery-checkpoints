import { useState } from "react";
import type { FormState } from "./formState";
import { StatusBanner } from "./StatusBanner";
import './typescript.css'

// Runnable demo shown in the dev server: cycle through every FormState variant
// and see how StatusBanner reacts.
const STATES: FormState[] = [
  { status: "idle" },
  { status: "submitting" },
  { status: "success", id: "42" },
  { status: "error", message: "Something went wrong" },
];

export default function Demo() {
  const [state, setState] = useState<FormState>(STATES[0]);

  return (
    <main className="typescript-demo">
      <section
        className="typescript-demo__panel"
        aria-labelledby="typescript-demo-title"
      >
        <h1 id="typescript-demo-title">Form status</h1>

        <div
          className="typescript-demo__controls"
          aria-label="Form state options"
        >
          {STATES.map((next) => (
            <button
              className="typescript-demo__button"
              key={next.status}
              type="button"
              aria-pressed={state.status === next.status}
              onClick={() => setState(next)}
            >
              {next.status}
            </button>
          ))}
        </div>

        <StatusBanner state={state} />
      </section>
      t
    </main>
  );
}
