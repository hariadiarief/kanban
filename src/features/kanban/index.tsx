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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useKanban } from '@/context/kanban/kanbanContext'
import { IkanbanColumnContent } from '@/context/kanban/kanbanTypes'
import { useEffect, useState } from 'react'

export default function Kanban() {
  const { dispatch, state } = useKanban()

  useEffect(() => {
    loadKanbanContent().then(content => {
      dispatch({ type: 'update-kanban', payload: content })
    })
  }, [])

  const nextId = state.columns.reduce(
    (acc, current) => acc + current.content.length,
    0
  )

  const AddNewTask = () => {
    const [form, setForm] = useState<IkanbanColumnContent>({
      id: nextId,
      title: '',
      description: '',
      assignTo: ''
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

              <Select
                value={form.assignTo}
                onValueChange={value => handleFormChange('assignTo', value)}
              >
                <SelectTrigger className='col-span-3'>
                  <SelectValue placeholder='None' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Front End'>Front End</SelectItem>
                  <SelectItem value='Back End'>Back End </SelectItem>
                  <SelectItem value='UI/UX Designer'>UI/UX Designer</SelectItem>
                </SelectContent>
              </Select>

              {/* 
              <Input
                value={form.assignTo}
                id='assignTo'
                defaultValue='@peduarte'
                className='col-span-3'
                onChange={e => handleFormChange('assignTo', e.target.value)}
              /> */}
            </div>
          </div>
          <DialogFooter>
            <Button
              type='submit'
              onClick={() => dispatch({ type: 'add-kanban', payload: form })}
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
      <KanbanContainer />
    </div>
  )
}
