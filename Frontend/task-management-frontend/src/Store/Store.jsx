import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import TaskSlice from "./TaskSlice";
import SubmissionSlice from "./SubmissionSlice";
import AuthSlice from "./AuthSlice";


const rootReducer = combineReducers({
   auth: AuthSlice,
   task: TaskSlice,
   submission: SubmissionSlice
})
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})

export default store;