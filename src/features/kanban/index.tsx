import { KanbanContainer } from '@/components/kanban'
import { loadKanbanContent } from '@/components/kanban/api'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { FancyMultiSelect } from '@/components/ui/fancy-multi-select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useKanban } from '@/context/kanban/kanbanContext'
import { IkanbanColumnContent } from '@/context/kanban/kanbanTypes'
import { roles_assignment } from '@/lib/const'
import { useEffect, useState } from 'react'

export default function Kanban() {
  const { dispatch, state } = useKanban()

  useEffect(() => {
    loadKanbanContent().then(content => {
      dispatch({ type: 'update-kanban', payload: content })
    })
  }, [dispatch])

  const nextId = state.columns.reduce(
    (acc, current) => acc + current.content.length,
    0
  )

  const AddNewTask = () => {
    const [form, setForm] = useState<IkanbanColumnContent>({
      id: nextId,
      title: '',
      description: '',
      assignTo: []
    })

    const handleFormChange = (key: string, value: string) => {
      setForm({
        ...form,
        [key]: value
      })
    }

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='outline'>Create New Task</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
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
                placeholder={'Select Assignment'}
                className='col-span-3'
                values={roles_assignment}
                onChange={value => handleFormChange('assignTo', value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type='submit'
              onClick={() => {
                dispatch({ type: 'add-kanban', payload: form })
              }}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <div className='space-y-4'>
      <h3 className='text-xl font-bold'>Kanban</h3>
      <AddNewTask />
      <ScrollArea className='w-full whitespace-nowrap rounded-md border p-2'>
        <KanbanContainer />
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </div>
  )
}
