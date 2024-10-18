import { apiSlice } from "../../api/apiSlice"

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/auth/getAllUserExceptCurrentUser', 
            keepUnusedDataFor: 0, 
            refetchOnMountOrArgChange: true,
        }),
        getUserById: builder.query({
            query: (id) => `/auth/getUserById/${id}`,
        }),
        getRecentUsers: builder.query({
            query: () => '/auth/getRecentUser',
            keepUnusedDataFor: 0,
            refetchOnMountOrArgChange: true,
        }),
        getCurrentUser: builder.query({ 
            query: () => '/auth/getCurrentUser',
            keepUnusedDataFor: 0, 
            refetchOnMountOrArgChange: true,
        }),
        updateUser: builder.mutation({
            query: ({ id, ...updatedData }) => ({
                url: `/auth/updateUser/${id}`,
                method: 'PUT',
                body: updatedData,
            }),
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/auth/deleteUser/${id}`,
                method: 'DELETE',
            }),
        }),
        updateCurrentUser: builder.mutation({  
            query: (updatedData) => ({
                url: '/auth/updateCurrentUser',
                method: 'PUT',
                body: updatedData,
            }),
        }),
        createUser: builder.mutation({ 
            query: (newUserData) => ({
                url: '/auth/createNewUser',
                method: 'POST',
                body: newUserData,
            }),
        }),
    })
})

export const {
    useGetUsersQuery: useGetAllUsersExceptCurrentUserQuery,
    useGetUserByIdQuery,
    useGetCurrentUserQuery,
    useGetRecentUsersQuery,
    useUpdateCurrentUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useCreateUserMutation
} = usersApiSlice;
