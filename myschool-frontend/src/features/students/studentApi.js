import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const studentApi = createApi({
    reducerPath:"studentApi",
    baseQuery:fetchBaseQuery({
        baseUrl:import.meta.env.VITE_API_URL,prepareHeaders:(headers) => {
            const token = localStorage.getItem("token")
            if(token){
                headers.set("authorization", `Bearer ${token}`)
            }
            return headers
        },
    }),
    tagTypes: ["Class"],
    endpoints: (builder) => ({
        getStudents: builder.query({
            query: (classId) => 
                classId ? `/students?classId=${classId}` : `students`,
            providesTags:["Student"]
        }),
        getStudentsByClass: builder.query({
            query:(classId) => `/students/class/${classId}`
        }),
        addStudent: builder.mutation({
            query:(formData) => ({
                url:"/students",
                method:"POST",
                body:formData
            }),
            invalidatesTags:["Student"]
        }),
        updateStudent:builder.mutation({
            query:({id,formData}) => ({
                url:`/students/${id}`,
                method:"PATCH",
                body:formData
            }),
            invalidatesTags:["Student"]
        }),
        deleteStudent: builder.mutation({
            query:(id) => ({
                url:`/students/${id}`,
                method:"DELETE"
            }),
            invalidatesTags: ["Student"]
        })
    })
})

export const {useGetStudentsQuery,useAddStudentMutation,useUpdateStudentMutation,useDeleteStudentMutation,useGetStudentsByClassQuery} = studentApi