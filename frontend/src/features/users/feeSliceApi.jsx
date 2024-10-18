import { apiSlice } from "../../api/apiSlice";

export const FeesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllFeesRecordsOfAStudent: builder.query({
            query: (studentId) => `/studentFee/getAllFeesRecordsOfAStudent/${studentId}`,
            keepUnusedDataFor: 0,
            refetchOnMountOrArgChange: true,
        }),
        createFeeRecord: builder.mutation({
            query: ({ studentId, ...body }) => ({
                url: `/studentFee/createFeeOfAstudent/${studentId}`,
                method: 'POST',
                body,
            }),
        }),
        updateFeesRecordOfAStudent: builder.mutation({
            query: ({feeId, ...body }) => ({
                url: `/studentFee/updateFeesRecordOfAStudent/${feeId}`,
                method: 'PUT',
                body,
            }),
        }),
        deleteFeesRecordOfAStudent: builder.mutation({
            query: (feeId) => ({
                url: `/studentFee/deleteFeesRecordOfAStudents/${feeId}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetAllFeesRecordsOfAStudentQuery,
    useCreateFeeRecordMutation,
    useUpdateFeesRecordOfAStudentMutation,
    useDeleteFeesRecordOfAStudentMutation
} = FeesApiSlice;
