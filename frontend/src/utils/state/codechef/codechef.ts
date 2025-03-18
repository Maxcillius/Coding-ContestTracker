import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CodechefState {
    value: any[];
}

const initialState: CodechefState = {
    value: []
};

const codechefSlice = createSlice({
    name: "codechef",
    initialState,
    reducers: {
        setCodechefState: (state, action: PayloadAction<any>) => {
            state.value.push(action.payload)
        }
    }
});

export const { setCodechefState } = codechefSlice.actions;
export default codechefSlice.reducer;
