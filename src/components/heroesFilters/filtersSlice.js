import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const filtersAdapter = createEntityAdapter();

const initialState = filtersAdapter.getInitialState({
    filtersLoadingStatus: 'idle',
    activeFilter: 'all'
})

// const initialState = {
//     filters: [],
//     filtersLoadingStatus: 'idle',
//     activeFilter: 'all'
// }

export const fetchFlters = createAsyncThunk(
    'filters/fetchFlters',
    () => {
        const {request} = useHttp();
        return request("http://localhost:3001/filters");
    }
)


const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        activeFilterChanged: (state, action) => {state.activeFilter = action.payload}
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFlters.pending, state => {state.filtersLoadingStatus = 'loading'})
            .addCase(fetchFlters.fulfilled, (state, action) => {
                state.filtersLoadingStatus = 'idle'
                filtersAdapter.setAll(state, action.payload)
            })
            .addCase(fetchFlters.rejected, state => {state.filtersLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
})

const {reducer, actions} = filtersSlice;

export const {selectAll} = filtersAdapter.getSelectors(state => state.filters)


export default reducer;
export const {
    activeFilterChanged
} = actions;