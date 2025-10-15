import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const timetableApi = createApi({
    reducerPath:"timetableApi",
    baseQuery: fetchBaseQuery({
        baseUrl:import.meta.env.VITE_API_URL,prepareHeaders:(headers) => {
            const token = localStorage.getItem("token")
            if(token){
                headers.set("authorization",`Bearer ${token}`)
            }
            return headers
        }
    }),
    tagTypes: ["TimeTable"],
    endpoints: (builder) => ({
        getTimetables: builder.query({
            query: () => "/timetable",
            providesTags: ["TimeTable"]
        }),
        getTimetableByClass: builder.query({
            query: (classId) => `timetable/class/${classId}`,
            providesTags: ["TimeTable"]
        }),
        addTimetable: builder.mutation({
            query: (formData) => ({
                url:"timetable",
                method:"POST",
                body:formData
            }),
            invalidatesTags:["TimeTable"]
        }),
        updateTimetable: builder.mutation({
            query: ({id, formData}) => ({
                url:`/timetable/${id}`,
                method:"PATCH",
                body:formData
            }),
            invalidatesTags:["TimeTable"]
        }),
        deleteTimetable: builder.mutation({
            query: (id) => ({
                url: `/timetable/${id}`,
                method:"DELETE"
            }),
            invalidatesTags: ["TimeTable"]
        })
    })
})

export const {useGetTimetablesQuery,useAddTimetableMutation,useUpdateTimetableMutation,useDeleteTimetableMutation,useLazyGetTimetableByClassQuery} = timetableApi