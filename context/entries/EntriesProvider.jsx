import { entriesReducer } from "./entriesReducer"
import { v4 as uuidv4 } from 'uuid';
import { entry, status, types } from "../constants";
import { useReducer } from "react";
import { EntriesContext } from "./EntriesContext";

const ENTRIES_INITIAL_STATE = {
    entries: [
        {
            _id: uuidv4(),
            description: `This is a description for entries initial state - ${status.pending}`,
            status: status.pending,
            createdAt: Date.now(),
        },
        {
            _id: uuidv4(),
            description: `This is a description for entries initial state - ${status.inProgress}`,
            status: status.inProgress,
            createdAt: Date.now() - 100000000000,
        },
        {
            _id: uuidv4(),
            description: `This is a description for entries initial state - ${status.finished}`,
            status: status.finished,
            createdAt: Date.now() - 100000000,
        },
    ]
}

export const EntriesProvider = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

    const addNewEntry = (description) => {
        const newEnrty = {
            _id: uuidv4(),
            description,
            status: status.pending,
            createdAt: Date.now(),
        }

        dispatch({ type: entry.addEntry, payload: newEnrty });
    }

    const updateEntry = (entryToUpdate) => {
      dispatch({type: entry.updated, payload: entryToUpdate});
    }

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