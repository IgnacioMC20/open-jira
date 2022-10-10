import { entriesReducer } from "./entriesReducer"
// import { v4 as uuidv4 } from 'uuid';
import { entry } from "../constants";
import { useEffect, useReducer } from "react";
import { EntriesContext } from "./EntriesContext";
import { getEntriesAPI, postEntriesAPI, putEntriesAPI } from "../../apis";


const ENTRIES_INITIAL_STATE = {
    entries: []
}

export const EntriesProvider = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

    const addNewEntry = async (description) => {
        const newEntry = await postEntriesAPI({ description });
        dispatch({ type: entry.addEntry, payload: newEntry });
    }

    const updateEntry = async (entryToUpdate) => {
        //Todo: actualizar estado de la entrada en el backend
        const entryUpdated = await putEntriesAPI(entryToUpdate);
        dispatch({ type: entry.updated, payload: entryUpdated });
    }

    const refreshEntries = async () => {
        const entries = await getEntriesAPI();
        dispatch({ type: entry.refresh, payload: entries })
    }

    useEffect(() => {
        refreshEntries();
    }, [])


    return (
        <EntriesContext.Provider value={{
            ...state,

            // Methods
            addNewEntry,
            updateEntry,
        }}>
            {children}
        </EntriesContext.Provider>
    )
}