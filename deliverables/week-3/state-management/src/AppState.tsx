import React, { createContext, useContext, useState, useEffect } from 'react'
import { fetchUsers, type User } from './api'

interface AppStateContextType {
  users: User[]
  isLoading: boolean
  selectedId: string | null
  select: (id: string) => void
}

const AppStateContext = createContext<AppStateContextType | null>(null)

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    setIsLoading(true)
    
    fetchUsers().then((result) => {
      if (!active) return
      setUsers(result)
      setIsLoading(false)
    })
    
    return () => {
      active = false 
    }
  }, [])

  return (
    <AppStateContext.Provider value={{ users, isLoading, selectedId, select: setSelectedId }}>
      {children}
    </AppStateContext.Provider>
  )
}

export function useUsers(): { users: User[]; isLoading: boolean } {
  const context = useContext(AppStateContext)
  if (!context) {
    throw new Error('useUsers must be used within an AppStateProvider')
  }
  return { users: context.users, isLoading: context.isLoading }
}

export function useSelectedUser(): {
  selectedId: string | null
  select: (id: string) => void
} {
  const context = useContext(AppStateContext)
  if (!context) {
    throw new Error('useSelectedUser must be used within an AppStateProvider')
  }
  return { selectedId: context.selectedId, select: context.select }
}