
import { useReducer } from 'react'
import { entry, types } from '../constants';
import { UIContext, uiReducer } from './';

const UI_INITIAL_STATE = {
    sidemenuOpen: false,
    isAddingEntry: false,
    isDragging: false,
}

export const UIProvider = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    const openSideMenu = () =>  dispatch({type: types.uiOpenSidebar});

    const closeSideMenu = () => dispatch({type: types.uiCloseSidebar});

    const setIsAddingEntry = (value) => dispatch({type: entry.isAddingEntry, payload: value});

    const startDragging = () => dispatch({type: types.uiStartDragging});

    const endDragging = () => dispatch({type: types.uiEndDragging});

    //Todo: poner boton para cambiar el color del tema

    return (
        <UIContext.Provider value={{
            ...state,

            // Methods
            openSideMenu,
            closeSideMenu,
            setIsAddingEntry,
            startDragging,
            endDragging,
        }}>
            {children}
        </UIContext.Provider>
    )
}