import { IActionkanban, IStateKanban } from './kanbanTypes'

export const initialState: IStateKanban = {
  columns: []
}

export const reducer = (state: IStateKanban, action: IActionkanban): any => {
  switch (action.type) {
    case 'update-kanban':
      return action.payload
    case 'add-kanban':
      return {
        ...state,
        columns: state.columns.map(column =>
          column.name === 'TO DO'
            ? {
                ...column,
                content: [...column.content, action.payload]
              }
            : column
        )
      }
    default:
      return state
  }
}
