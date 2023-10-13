import {configureStore} from "@reduxjs/toolkit";
import {pathSlice} from "./path/pathSlice";

export const store = configureStore({
    reducer: {
        path: pathSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;