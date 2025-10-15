import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const staffApi = createApi({
  reducerPath: "staffApi",
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
  tagTypes: ["Staff"],
  endpoints: (builder) => ({
    getStaff: builder.query({
      query: () => "/staff",
      providesTags: ["Staff"],
    }),

    createStaff: builder.mutation({
      query: (formData) => ({
        url: "/staff",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Staff"],
    }),

    updateStaff: builder.mutation({
      query: ({ id, data }) => ({
        url: `/staff/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Staff"],
    }),

    deleteStaff: builder.mutation({
      query: (id) => ({
        url: `/staff/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Staff"],
    }),
    registerStaffUser: builder.mutation({
      query: (data) => ({
        url: "/staff/register-user",
        method:"POST",
        body:data
      }),
      invalidatesTags:["Staff"]
    }),
    updateStaffPassword: builder.mutation({
      query:({userId,password}) => ({
        url:`${import.meta.env.VITE_API_URL}/users/${userId}/password`,
        method:"PATCH",
        body:password
      })
    })
  }),
});

export const {
  useCreateStaffMutation,
  useGetStaffQuery,
  useUpdateStaffMutation,
  useDeleteStaffMutation,
  useRegisterStaffUserMutation,
  useUpdateStaffPasswordMutation
} = staffApi;
