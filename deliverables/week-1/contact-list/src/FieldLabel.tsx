import type { ReactNode } from 'react'
import './FieldLabel.css'

// The small-caps label shared by the search box and the form fields. Extracted
// as a component rather than as a shared CSS class so the styles keep a 1:1
// relationship with the markup that owns them.
export function FieldLabel({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label className="field-label" htmlFor={htmlFor}>
      {children}
    </label>
  )
}
