'use client'

import React, { ReactNode, createContext, useContext, useReducer } from 'react'
import { initialState, reducer } from './kanbanReducer'
import { IActionkanban, IStateKanban } from './kanbanTypes'

interface ContextProps {
  state: IStateKanban
  dispatch: React.Dispatch<IActionkanban>
}

const KanbanContext = createContext<ContextProps | undefined>(undefined)

export const KanbanProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <KanbanContext.Provider value={{ state, dispatch }}>
      {children}
    </KanbanContext.Provider>
  )
}

export const useKanban = (): ContextProps => {
  const context = useContext(KanbanContext)
  if (!context) {
    throw new Error('useKanban must be used within a AuthProvider')
  }

  return context
}
