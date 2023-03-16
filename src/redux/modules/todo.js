import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    todos: [],
    isLoading : false,
    error : null,
};

export const __getTodo = createAsyncThunk(
    "getTodo",
    async (payload, thunkApi)=> { 
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/todos`);
            return thunkApi.fulfillWithValue(response.data)
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
);

export const __addTodo = createAsyncThunk(
    "addTodo",
    async (newTodo, thunkApi) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/todos`, newTodo);
            return thunkApi.fulfillWithValue(response.data);
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
);

export const __deleteTodo = createAsyncThunk(
    "deleteTodo",
    async (payload, thunkApi) => {
        try {
            await axios.delete(`${process.env.REACT_APP_SERVER_URL}/todos/${payload}`);
            return thunkApi.fulfillWithValue(payload);
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
);

export const __switchTodo = createAsyncThunk(
    "switchTodo",
    async (payload, thunkApi) => {
        try {
            await axios.patch(`${process.env.REACT_APP_SERVER_URL}/todos/${payload.id}`, 
            {contents: payload.editContent});
            return thunkApi.fulfillWithValue(payload);
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
);

const todoSlice = createSlice({
    name : "todos",
    initialState,
    reducers : {},
    extraReducers : {
        [__getTodo.pending] : (state, action) => {
            state.isLoading = true;
        },
        [__getTodo.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.todos = action.payload;
        },
        [__getTodo.rejected] : (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        
        [__addTodo.pending] : (state, action) => {
            state.isLoading = true;
        },
        [__addTodo.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.todos.push(action.payload);
        },
        [__addTodo.rejected] : (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        [__deleteTodo.pending] : (state, action) => {
            state.isLoading = true;
        },
        [__deleteTodo.fulfilled] : (state, action) => {
            state.isLoading = false;
            state.todos = state.todos.filter((el) => el.id !== action.payload);
        },
        [__deleteTodo.rejected] : (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        [__switchTodo.pending] : (state, action) => {
            state.isLoading = true;
        },
        [__switchTodo.fulfilled] : (state, action) => {
            state.isLoading = false;
            const { id, editContent } = action.payload;
            const index = state.todos.findIndex((el) => el.id === id);
            if (index !== -1) {
                state.todos[index].contents = editContent; 
            }
            console.log(index)
        },
        [__switchTodo.rejected] : (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
});

export const {addTodo, removeTodo, modifyTodo} = todoSlice.actions;
export default todoSlice.reducer;