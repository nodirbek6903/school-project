    import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react';

    export const filesApi = createApi({
        reducerPath:"filesApi",
        baseQuery: fetchBaseQuery({
            baseUrl:import.meta.env.VITE_API_URL,
            prepareHeaders: (headers) => {
                const token = localStorage.getItem("token")
                if(token){
                    headers.set("authorization", `Bearer ${token}`)
                }
                return headers
            }
        }),
        tagTypes:["Files"],
        endpoints: (builder) => ({
            getFiles:builder.query({
                query: () => "/files",
                providesTags:["Files"]
            }),
            getFileById:builder.query({
                query:(id) => `/files/${id}`,
                providesTags:["Files"]
            }),
            addFiles: builder.mutation({
                query:(file) => ({
                    url:"/files",
                    method:"POST",
                    body:file
                }),
                invalidatesTags:["Files"]
            }),
            deleteFile:builder.mutation({
                query:(id) => ({
                    url:`/files/${id}`,
                    method:"DELETE"
                }),
                invalidatesTags:["Files"]
            })
        })
    })

    export const {useGetFilesQuery,useGetFileByIdQuery,useAddFilesMutation,useDeleteFileMutation} = filesApi
