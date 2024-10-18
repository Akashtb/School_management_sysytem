import { apiSlice } from "../../api/apiSlice";

export const LibraryApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllLibraryRecordsOfAStudent: builder.query({
            query: (studentId) => `/library/getAllLibraryRecordsOfAStudent/${studentId}`,
            keepUnusedDataFor: 0, 
            refetchOnMountOrArgChange: true,
        }),
        createLibraryRecord: builder.mutation({
            query: ({ studentId, newRecord }) => ({
                url: `/library/createLibraryRecord/${studentId}`,
                method: 'POST',
                body: newRecord,
            }),
        }),
        updateLibraryRecordOfAStudent: builder.mutation({
            query: ({ id, updatedRecord }) => ({
                url: `/library/updateLibraryRecordOfAStudent/${id}`,
                method: 'PUT',
                body: updatedRecord,
            }),
        }),
        deleteLibraryRecordOfAStudent: builder.mutation({
            query: (id) => ({
                url: `/library/deleteLibraryRecordOfAStudent/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetAllLibraryRecordsOfAStudentQuery,
    useCreateLibraryRecordMutation,
    useUpdateLibraryRecordOfAStudentMutation,
    useDeleteLibraryRecordOfAStudentMutation,
} = LibraryApiSlice;
