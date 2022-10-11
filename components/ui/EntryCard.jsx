import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import { useRouter } from 'next/router';
import React from 'react'
import { useContext } from 'react';
import { UIContext } from '../../context/ui';
import { dateFunctions } from '../../utils';

export const EntryCard = ({
  description,
  _id,
  createdAt, }) => {

  const { startDragging, endDragging } = useContext(UIContext);
  const router = useRouter();

  const onDragStart = (event) => {
    event.dataTransfer.setData('text', _id);
    // todo: modificar el estado para saber que estamos haciendo drag
    startDragging();

  }

  const onClick = () => {
    router.push(`/entries/${_id}`)
  }

  const onDragEnd = () => endDragging();

  return (
    <Card sx={{ marginBottom: 1 }} draggable={true} onDragStart={onDragStart} onDragEnd={onDragEnd} onClick={onClick}>
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>
            {description}
          </Typography>
        </CardContent>

        <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
          <Typography variant='body2'>
            {dateFunctions.getDistanceToNow(createdAt)}
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}
