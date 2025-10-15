import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
    reducerPath: "bookApi",
    baseQuery: fetchBaseQuery({
        baseUrl:import.meta.env.VITE_API_URL, prepareHeaders: (headers) => {
            const token = localStorage.getItem("token")
            if(token){
                headers.set("authorization", `Bearer ${token}`)
            }
            return headers
        }
    }),
    tagTypes: ["Books"],
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => "/library/books",
            providesTags: ["Books"]
        }),
        addBooks: builder.mutation({
            query: (data) => ({
                url: "/library/books",
                method:"POST",
                body:data
            }),
            invalidatesTags:["Books"]
        }),
        updateBook: builder.mutation({
            query:({id,data}) => ({
                url: `/library/books/${id}`,
                method:"PATCH",
                body:data
            }),
            invalidatesTags:["Books"]
        }),
        deleteBook: builder.mutation({
            query: (id) => ({
                url:`/library/books/${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["Books"]
        })
    })
})

export const {useAddBooksMutation,useDeleteBookMutation,useGetBooksQuery,useUpdateBookMutation} = bookApi