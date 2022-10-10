import { entry } from "../constants";

export const entriesReducer = (state, action) => {

    switch (action.type) {

        case entry.addEntry:
            return {
                ...state,
                entries: [...state.entries, action.payload],
            }
        
        case entry.updated:
            return {
                ...state,
                entries: state.entries.map( entry => {
                    if(entry._id === action.payload._id){
                        entry.status = action.payload.status;
                        entry.description = action.payload.description;
                    }
                    return entry;
                })
            }
        
        case entry.refresh:
            return {
                ...state,
                entries: [...action.payload],
            }

        default:
            return state;
    }

}