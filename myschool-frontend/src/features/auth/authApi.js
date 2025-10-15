import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
    reducerPath:"authApi",
    baseQuery:fetchBaseQuery({
        baseUrl:import.meta.env.VITE_API_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token")
            if(token){
                headers.set("authorization", `Bearer ${token}`)
            }
            return headers
        }
    }),
    endpoints: (builder) => ({
        login:builder.mutation({
            query: (data) => ({
                url:"/auth/login",
                method:"POST",
                body:data
            }),
        }),
        register: builder.mutation({
            query: (newUser) => ({
                url:"/auth/register",
                method:"POST",
                body:newUser
            })
        }),
        getMe: builder.query({
            query: () => "/auth/me"
        }),
    })
})

export const {useLoginMutation, useRegisterMutation, useGetMeQuery} = authApi
export const authApiReducerPath = authApi.reducerPath
