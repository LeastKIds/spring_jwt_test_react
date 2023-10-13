import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {pathSlice} from "./pathSlice";

export const getPath: string = useSelector( (state: RootState) => {
    return state.path.path;
})

export const setPath = (path: string) => {
    const dispatch = useDispatch();
    dispatch(pathSlice.actions.setPath(path))
}