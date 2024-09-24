import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, setAuthHeader } from "../api/api";


export const fetchTasks = createAsyncThunk("task/fetchTasks", 
    async({status})=> {
        setAuthHeader(localStorage.getItem("jwt"), api)
        try {
            const {data}= await api.get("/api/tasks", {
                params: {status }
            });
            console.log("task fetched successfully", data);
            return data;
        } catch (error) {
            console.log("Error fetching tasks", error);
            throw Error(error.response.data.error);
        }
    }
)

export const fetchUsersTasks = createAsyncThunk("task/fetchUsersTasks", 
    async({status})=> {
        setAuthHeader(localStorage.getItem("jwt"), api)
        try {
            const {data}= await api.get("/api/tasks/user", {
                params: {status }
            });
            console.log("users task fetched successfully", data);
            return data;
        } catch (error) {
            console.log("Error fetching users tasks", error);
            throw Error(error.response.data.error);
        }
    }
)

export const fetchTasksById = createAsyncThunk("task/fetchTasksById", 
    async(taskId)=> {
        setAuthHeader(localStorage.getItem("jwt"), api)
        try {
            const {data}= await api.get(`/api/tasks/${taskId}`);
            console.log("fetchTasksById", data);
            return data;
        } catch (error) {
            console.log("Error fetchTasksById", error);
            throw Error(error.response.data.error);
        }
    }
)


export const createTask = createAsyncThunk("task/createTask", 
    async(taskData)=> {
        setAuthHeader(localStorage.getItem("jwt"), api)
        console.log("Payload being sent to the server: ", taskData);

        try {
            const {data}= await api.post(`/api/tasks`,taskData);
            console.log("created Task", data);
            return data;
        } catch (error) {
            console.log("Error in create  Task", error);
            throw Error(error.response.data.error);
        }
    }
)

export const updateTask = createAsyncThunk("task/updateTask", 
    async({id, updatedTaskData})=> {
        setAuthHeader(localStorage.getItem("jwt"), api)
        try {
            const {data}= await api.put(`/api/tasks/${id}`,updatedTaskData);
            console.log("updatedTaskData Task", data);
            return data;
        } catch (error) {
            console.log("Error in update  Task", error);
            throw Error(error.response.data.error);
        }
    }
)

export const assignedTaskToUser = createAsyncThunk("task/assignedTaskToUser", 
    async({taskId, userId})=> {
        setAuthHeader(localStorage.getItem("jwt"), api)
        try {
            const {data}= await api.put(`/api/tasks/${taskId}/user/${userId}/assigned`);
            console.log("assignedTaskToUser Task", data);
            return data;
        } catch (error) {
            console.log("Error in assignedTask", error);
            throw Error(error.response.data.error);
        }
    }
)

export const deleteTask = createAsyncThunk("task/deleteTask", 
    async(taskId)=> {
        setAuthHeader(localStorage.getItem("jwt"), api)
        try {
            const {data}= await api.delete(`/api/tasks/${taskId}`);
            console.log("deleted Task Success");
            return data;
        } catch (error) {
            console.log("Error in delete task", error);
            throw Error(error.response.data.error);
        }
    }
)

const taskSlice = createSlice({
    name: "task",
    initialState: {
        tasks: [],
        taskDetails: null,
        usersTask: [],
        loading: false,
        error: null
    },
    reducer: {},
    extraReducers:(builder) => {
        builder
        .addCase(fetchTasks.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchTasks.fulfilled, (state, action)=>{
            state.loading = false;
            state.tasks = action.payload;
        })

        .addCase(fetchTasks.rejected, (state, action)=>{
            state.error = action.error.message;
            state.loading = false;
        })

        
        .addCase(fetchUsersTasks.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchUsersTasks.fulfilled, (state, action)=>{
            state.loading = false;
            state.usersTask = action.payload;
        })
        .addCase(fetchTasksById.fulfilled, (state, action)=>{
            state.loading = false;
            state.taskDetails = action.payload;
        })

        .addCase(fetchUsersTasks.rejected, (state, action)=>{
            state.error = action.error.message;
            state.loading = false;
        })

        .addCase(createTask.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(createTask.fulfilled, (state, action)=>{
            state.loading = false;
            state.tasks.push(action.payload);
        })

        .addCase(createTask.rejected, (state,action)=>{
            state.error = action.error.message;
            state.loading = false;
        })

        .addCase(updateTask.fulfilled, (state, action)=>{
            const updatedTask = action.payload;
            state.loading = false;
            state.tasks= state.tasks.map((task) => task.id === updatedTask.id?{...task, ...updatedTask}: task);
        })

        .addCase(assignedTaskToUser.fulfilled, (state, action)=>{
            const updatedTask = action.payload;
            state.loading = false;
            state.tasks= state.tasks.map((task) => task.id === updatedTask.id?{...task, ...updatedTask}: task);
        })

        .addCase(deleteTask.fulfilled, (state, action)=>{
            state.loading = false;
            state.tasks= state.tasks.filter((task) => task.id !== action.payload)
        })
    }    
})

export default taskSlice.reducer;