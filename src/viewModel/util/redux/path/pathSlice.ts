import {createSlice} from "@reduxjs/toolkit";

export const pathSlice = createSlice({
    name: 'pathSlice',
    initialState: {path: '/'},
    reducers: {
        setPath: (state, action) => {
            state.path = action.payload
        }
    }
})
