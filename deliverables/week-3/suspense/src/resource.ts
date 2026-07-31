export interface Resource<T> {
  read(): Promise<T>
  invalidate(): void
}

export function createResource<T>(load: () => Promise<T>): Resource<T> {
  let promise: Promise<T> | null = null

  return {
    read: () => (promise ??= load()),
    invalidate: () => {
      promise = null
    },
  }
}
