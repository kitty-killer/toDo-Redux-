import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const taskApi = createApi({
    reducerPath: 'taskApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
    tagTypes: ['Tasks'],
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: () => 'tasks',
            providesTags: ['Tasks'],
        }),
        addTask: builder.mutation({
            query: (task) => ({
                url: 'tasks',
                method: 'POST',
                body: task,
            }),
            invalidatesTags: ['Tasks'],
        }),
        updateTask: builder.mutation({
            query: ({ id, ...task }) => ({
                url: `tasks/${id}`,
                method: 'PUT',
                body: task,
            }),
            invalidatesTags: ['Tasks'],
        }),
        deleteTask: builder.mutation({
            query: (id) => ({
                url: `tasks/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Tasks'],
        }),
    }),
});

export const {
    useGetTasksQuery,
    useAddTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
} = taskApi;