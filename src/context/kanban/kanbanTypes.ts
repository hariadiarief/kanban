export interface IStateKanban {
  columns: IkanbanColumns[]
}

export interface IkanbanColumns {
  id: number
  name: string
  content: IkanbanColumnContent[]
}

export interface IkanbanColumnContent {
  id: number
  title: string
  description: string
  assignTo: 'Front End' | 'Back End' | 'UI/UX Designer' | ''
}

export type IActionkanban = IActionkanbanAdd | IActionkanbanUpdate

export interface IActionkanbanAdd {
  type: 'add-kanban'
  payload: IkanbanColumnContent
}
export interface IActionkanbanUpdate {
  type: 'update-kanban'
  payload: IStateKanban
}
