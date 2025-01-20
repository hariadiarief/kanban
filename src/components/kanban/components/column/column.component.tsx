import React from 'react'
import { CardContent } from '../../model'
import { Card } from '../card/'
import { EmptySpaceDropZone } from '../empty-space-drop-zone.component'

interface Props {
  columnId: number
  name: string
  content: CardContent[]
}

export const Column: React.FC<Props> = props => {
  const { columnId, name, content } = props

  return (
    <div
      // className={classes.container}
      className='flex h-screen flex-col gap-2 rounded-md bg-slate-200 p-2'
    >
      <h4 className='min-w-[300px] text-center font-bold'>{name}</h4>
      {content.map(card => (
        <Card key={card.title} content={card} columnId={columnId} />
      ))}
      <EmptySpaceDropZone columnId={columnId} />
    </div>
  )
}
