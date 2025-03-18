import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Codeforces } from '../../../interfaces/contests'

interface codeforcesState {
    value: Codeforces[]
}

const initialState: codeforcesState = {
    value: []
}

const codeforcesSlice = createSlice({
    name: "codeforces",
    initialState,
    reducers: {
        setCodeforcesState: (state, action: PayloadAction<any>) => {
            state.value.push(action.payload)
        }
    }
})

export const { setCodeforcesState } = codeforcesSlice.actions
export default codeforcesSlice.reducer