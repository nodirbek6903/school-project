import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookRecordApi = createApi({
    reducerPath:"bookRecordApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL, prepareHeaders: (headers) => {
            const token = localStorage.getItem("token")
            if(token){
                headers.set("authorization",`Bearer ${token}`)
            }
            return headers
        }
    }),
    tagTypes:["BookRecord"],
    endpoints: (builder) => ({
        getBookRecords: builder.query({
            query: () => "/library/records",
            providesTags: ["BookRecord"]
        }),
        addBookRecord: builder.mutation({
            query: (data) => ({
                url:"/library/records",
                method:"POST",
                body:data
            }),
            invalidatesTags: ["BookRecord"]
        }),
        updateBookRecord: builder.mutation({
            query: ({id, data}) => ({
                url:`/library/records/${id}/return`,
                method:"PATCH",
                body:data
            }),
            invalidatesTags:["BookRecord"]
        })
    })
})


export const {useGetBookRecordsQuery,useAddBookRecordMutation,useUpdateBookRecordMutation} = bookRecordApi