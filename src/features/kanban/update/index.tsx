import { loadKanbanContent } from '@/components/kanban/api'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FancyMultiSelect } from '@/components/ui/fancy-multi-select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useKanban } from '@/context/kanban/kanbanContext'
import {
  IkanbanColumnContent,
  IkanbanColumns
} from '@/context/kanban/kanbanTypes'
import { roles_assignment } from '@/lib/const'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

export default function UpdateKanban() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { state, dispatch } = useKanban()

  const [form, setForm] = useState<IkanbanColumnContent>({
    id: Number(id),
    title: '',
    description: '',
    assignTo: []
  })

  const [selectedColumn, setselectedColumn] = useState<IkanbanColumns | null>(
    null
  )

  useEffect(() => {
    loadKanbanContent().then(content => {
      dispatch({ type: 'update-kanban', payload: content })
    })
  }, [dispatch])

  useEffect(() => {
    let selectedColumn, selectedCard

    state.columns.forEach(column => {
      const matchedCards = column.content.filter(item => item.id === Number(id))
      if (matchedCards.length > 0) {
        selectedColumn = column
        selectedCard = matchedCards[0]
      }
    })

    if (selectedColumn) setselectedColumn(selectedColumn)
    if (selectedCard) setForm(selectedCard)
  }, [state.columns, id])

  const handleFormChange = (key: string, value: string | string[]) => {
    setForm({
      ...form,
      [key]: value
    })
  }

  const handleSubmit = () => {
    if (!selectedColumn?.name) return

    const payload = {
      columns: state.columns.map(column =>
        column.name === selectedColumn.name
          ? {
              ...column,
              content: [
                ...column.content.filter(item => item.id !== Number(id)),
                form
              ]
            }
          : column
      )
    }

    dispatch({ type: 'update-kanban', payload })
    navigate(`/detail/${id}`)
  }

  const handleDelete = () => {
    if (!selectedColumn?.name) return

    const payload = {
      columns: state.columns.map(column =>
        column.name === selectedColumn.name
          ? {
              ...column,
              content: [
                ...column.content.filter(item => item.id !== Number(id))
              ]
            }
          : column
      )
    }

    dispatch({ type: 'update-kanban', payload })
    navigate('/')
  }

  if (Object.keys(selectedColumn || {}).length === 0) {
    return <div>no data</div>
  }

  return (
    <div className='flex flex-col'>
      <div className='text-xl font-bold'>Edit Task</div>

      <Card className='my-8 p-8 px-16'>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='id' className='text-right'>
              ID
            </Label>
            <Input value={form.id} disabled id='id' className='col-span-3' />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='title' className='text-right'>
              Title
            </Label>
            <Input
              value={form.title}
              id='title'
              defaultValue='@peduarte'
              className='col-span-3'
              onChange={e => handleFormChange('title', e.target.value)}
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='description' className='text-right'>
              Description
            </Label>
            <Input
              value={form.description}
              id='description'
              defaultValue='@peduarte'
              className='col-span-3'
              onChange={e => handleFormChange('description', e.target.value)}
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='assignTo' className='text-right'>
              Assign to
            </Label>

            <FancyMultiSelect
              defaultValues={form.assignTo}
              placeholder={'Select Assignment'}
              className='col-span-3'
              values={roles_assignment}
              onChange={value => handleFormChange('assignTo', value)}
            />
          </div>
        </div>
      </Card>

      <div className='flex'>
        <Button
          variant={'destructive'}
          className='ml-auto'
          type='submit'
          onClick={handleDelete}
        >
          Delete
        </Button>
        <Button className='ml-4' type='submit' onClick={handleSubmit}>
          Save changes
        </Button>
      </div>
    </div>
  )
}
