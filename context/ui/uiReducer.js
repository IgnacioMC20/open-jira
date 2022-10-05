import { entry, types } from "../constants";

export const uiReducer = (state, action ) => {
  
    switch (action.type) {
        case types.uiOpenSidebar:
            return {
                ...state,
                sidemenuOpen: true,
            }
    
        case types.uiCloseSidebar:
            return {
                ...state,
                sidemenuOpen: false,
            }

        case entry.isAddingEntry:
            return {
                ...state,
                isAddingEntry: action.payload
            }
        
        case types.uiStartDragging:
            return {
                ...state,
                isDragging: true,
            }

        case types.uiEndDragging:
            return {
                ...state,
                isDragging: false,
            }
    
        default:
            return state;
    }
}