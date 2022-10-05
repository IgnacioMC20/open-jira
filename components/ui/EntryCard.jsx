import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import React from 'react'
import { useContext } from 'react';
import { UIContext } from '../../context/ui';
import { aDay, timeSince } from '../../utils/dateFormatter';

export const EntryCard = ({
  description,
  _id,
  createdAt, }) => {

  const { startDragging, endDragging } = useContext(UIContext);

  const onDragStart = (event) => {
    event.dataTransfer.setData('text', _id);
    // todo: modificar el estado para saber que estamos haciendo drag
    startDragging();

  }

  const onDragEnd = (event) => endDragging();

  return (
    <Card sx={{ marginBottom: 1 }} draggable={true} onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>
            {description}
          </Typography>
        </CardContent>

        <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
          <Typography variant='body2'>
            {timeSince(createdAt - aDay)}
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}
