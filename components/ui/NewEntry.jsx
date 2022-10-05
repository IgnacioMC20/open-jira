import React, { useContext, useState } from 'react'

import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system';

import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '../../context/ui';

// import { CancelIcon, SaveIcon } from '@mui/icons-material';

export const NewEntry = () => {

    // const [isAddingEntry, setIsAddingEntry] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [touched, setTouched] = useState(false);

    const { addNewEntry } = useContext(EntriesContext);
    const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);

    const onTextFieldChange = (event) => {
        setInputValue(event.target.value);
    }

    const onSave = () => {

        if (inputValue.length <= 0) return;

        addNewEntry(inputValue);
        setInputValue('');
        setIsAddingEntry(false);
        setTouched(false);

    }

    return (
        <Box sx={{ margin: '2px 5px' }}>
            {
                isAddingEntry ? (
                    <>
                        <TextField fullWidth placeholder='Nueva Entrada' label='Nueva Entrada' value={inputValue} onChange={onTextFieldChange}
                            helperText={inputValue.length <= 0 && touched && 'Agrega un valor'} error={inputValue.length <= 0 && touched}
                            autoFocus multiline sx={{ marginTop: 2, marginBottom: 1 }} onBlur={() => setTouched(true)}
                        />
                        <Box display='flex' justifyContent='space-around'>
                            <Button variant='contained' color='secondary' endIcon={<SaveIcon />} onClick={onSave}>
                                Guardar
                            </Button>

                            <Button variant='contained' color='secondary' onClick={() => {
                                setIsAddingEntry(false);
                                setTouched(false)
                            }} endIcon={<CancelIcon />}>
                                Cancelar
                            </Button>
                        </Box>
                    </>
                ) : (

                    <Button startIcon={<AddCircleOutlineIcon />} fullWidth variant='contained' color='secondary' onClick={() => setIsAddingEntry(true)}>
                        Agregar Tarea
                    </Button>
                )
            }

        </Box>
    )
}
