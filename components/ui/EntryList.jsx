import React, { useMemo } from 'react'
import { List, Paper } from '@mui/material'
import { EntryCard } from './EntryCard'
import { useContext } from 'react'
import { UIContext } from '../../context/ui'
import style from './EntryList.module.css'
import { EntriesContext } from '../../context/entries/EntriesContext'


export const EntryList = ({ status }) => {

  const { entries } = useContext(EntriesContext);
  
  const entriesByStatus = useMemo(() => entries.filter((entry) => {
    return entry.status == status
  }), [entries]);

  const { isDragging, endDragging } = useContext(UIContext);
  const { updateEntry } = useContext(EntriesContext);

  const onDropEntry = (event) => {
    const id = event.dataTransfer.getData('text');
    // console.log({id});
    const entry = entries.find(e => e._id === id);
    entry.status = status;
    updateEntry(entry);
    endDragging();
  }

  // const allowDrop = (event) => {
  //   event.preventDefault();
  // }

  return (
    // todo: aqui haremos drop
    <div onDrop={onDropEntry} onDragOver={(e) => e.preventDefault()} className={isDragging ? style.dragging : ''}>
      <Paper sx={{ height: 'calc(100vh - 250px)', /* overflow: 'scroll', */ backgroundColor: 'transparent', padding: '1px 5px' }}>

        {/* Todo: cambiara dependiendo si estoy haciendo drago o no */}
        <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all 0.3s' }}>
          {
            entriesByStatus &&
            entriesByStatus.map(entry => (<EntryCard key={entry._id} {...entry} />))
          }

        </List>
      </Paper>
    </div>
  )
}
