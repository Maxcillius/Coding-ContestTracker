import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Leetcode } from '../../../interfaces/contests'

interface leetcodeState {
    value: Leetcode[]
}

const initialState: leetcodeState = {
    value: []
}

const leetcodeSlice = createSlice({
    name: "leetcode",
    initialState,
    reducers: {
        setLeetcodeState: (state, actions: PayloadAction<any>) => {
            state.value.push(actions.payload)
        }
    }
})

export const { setLeetcodeState } = leetcodeSlice.actions
export default leetcodeSlice.reducer