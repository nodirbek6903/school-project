import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedStaff: null
}

const staffSlice = createSlice({
    name:"Staff",
    initialState,
    reducers: {
        setSelectedStaff: (state,action) => {
            state.selectedStaff = action.payload
        },
        clearSelectedStaff: (state) => {
            state.selectedStaff = null
        }
    }
})

export const {setSelectedStaff,clearSelectedStaff} = staffSlice.actions
export default staffSlice.reducer