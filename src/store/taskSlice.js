import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.push(action.payload);

        },
        editTask: (state, action) => {
            const { index, newTask } = action.payload;
            state[index] = newTask;

        },
        deleteTask: (state, action) => {
            state.splice(action.payload, 1);
        },
    },
});

export const { addTask, editTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
