import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const teachersApi = createApi({
  reducerPath: "teachersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Teacher"],
  endpoints: (builder) => ({
    getTeachers: builder.query({
      query: () => "/teachers",
      providesTags: ["Teacher"],
    }),
    getTeachersById: builder.query({
      query: (id) => `/teachers/${id}`,
      providesTags: ["Teacher"],
    }),
    addTeacher: builder.mutation({
      query: (formData) => ({
        url: "/teachers",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Teacher"],
    }),
    updateTeacher: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/teachers/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Teacher"],
    }),
    deleteTeacher: builder.mutation({
      query: (id) => ({
        url: `/teachers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Teacher"],
    }),
    registerTeacherUser: builder.mutation({
      query: (data) => ({
        url: "/teachers/register-user",
        method: "POST",
        body: data,
      }),
      invalidatesTags:["Teacher"]
    }),
    updateTeacherPassword: builder.mutation({
      query: ({userId,password}) => ({
        url:`${import.meta.env.VITE_API_URL}/users/${userId}/password`,
        method:"PATCH",
        body:{password}
      })
    })
  }),
});

export const {
  useAddTeacherMutation,
  useDeleteTeacherMutation,
  useGetTeachersQuery,
  useUpdateTeacherMutation,
  useGetTeachersByIdQuery,
  useRegisterTeacherUserMutation,
  useUpdateTeacherPasswordMutation
} = teachersApi;
