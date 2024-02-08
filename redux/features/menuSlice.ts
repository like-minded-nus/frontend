import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// Define the State Type
interface MenuState {
    activeItem: number;
}

// Define the initial state
const initialState: MenuState = {
    activeItem: 0,
};

export const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        setActiveItem: (state, action: PayloadAction<number>) => {
            return { ...state, activeItem: action.payload }
        }
    }
})

export const { setActiveItem } = menuSlice.actions;
export default menuSlice.reducer;