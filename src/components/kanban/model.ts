export interface CardContent {
  id: number
  title: string
  description: string
  assignTo: 'Front End' | 'Back End' | 'UI/UX Designer' | ''
}

export interface Column {
  id: number
  name: string
  content: CardContent[]
}

export interface KanbanContent {
  columns: Column[]
}

export const createDefaultKanbanContent = (): KanbanContent => ({
  columns: []
})
