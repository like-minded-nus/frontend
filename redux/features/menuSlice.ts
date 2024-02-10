import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit"

// Define the State Type
interface MenuState {
    activeItem: number;
    menuExpanded: boolean;
}

// Define the initial state
const initialState: MenuState = {
    activeItem: 0,
    menuExpanded: true
};

export const menuSlice: Slice<MenuState> = createSlice({
    name: "menu",
    initialState,
    reducers: {
        setActiveItem: (state, action: PayloadAction<number>) => {
            return { ...state, activeItem: action.payload }
        },
        setMenuExpand: (state, action: PayloadAction<boolean>) => {
            return { ...state, menuExpanded: action.payload }
        }
    }
})

export const { setActiveItem, setMenuExpand } = menuSlice.actions;
export default menuSlice.reducer;