import { KanbanContainer } from '@/components/kanban'
import { loadKanbanContent } from '@/components/kanban/api'
import { useKanban } from '@/context/kanban/kanbanContext'
import { IkanbanColumnContent } from '@/context/kanban/kanbanTypes'
import { useEffect } from 'react'

export default function Kanban() {
  const { dispatch, state } = useKanban()

  useEffect(() => {
    loadKanbanContent().then(content => {
      dispatch({ type: 'update-kanban', payload: content })
    })
  }, [])

  let newData: IkanbanColumnContent = {
    id: state.columns[0]?.content?.length + 1 || 1,
    title: ''
  }

  return (
    <div>
      <KanbanContainer />
      <button
        onClick={() => dispatch({ type: 'add-kanban', payload: newData })}
      >
        add tast
      </button>
    </div>
  )
}
