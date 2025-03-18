import { configureStore } from "@reduxjs/toolkit"

import leetcodeReducer from "./leetcode/leetcode"
import codeforcesReducer from "./codeforces/codeforces"
import codechefReducer from "./codechef/codechef"

export const store = configureStore({
    reducer: {
        leetcode: leetcodeReducer,
        codeforces: codeforcesReducer,
        codechef: codechefReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch