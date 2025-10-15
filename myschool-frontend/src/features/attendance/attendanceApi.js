import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const attendanceApi = createApi({
  reducerPath:"attendanceApi",
  baseQuery:fetchBaseQuery({
    baseUrl:import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token")
      if(token){
        headers.set("Authorization",`Bearer ${token}`)
      }
      return headers
    }
  }),
  tagTypes:["Attendance"],
  endpoints: (builder) => ({
    addAttendance : builder.mutation({
      query: (data) => ({
        url:"/attendance",
        method:"POST",
        body:data
      }),
      invalidatesTags:["Attendance"]
    }),
    getAttendanceByClassAndDate: builder.query({
      query: ({classId,date}) => `/attendance?classId=${classId}&date=${date}`,
      providesTags:["Attendance"]
    }),
    getAllAttendances:builder.query({
      query: () => "/attendance/all",
      providesTags:["Attendance"]
    }),
    getAttendanceHistory:builder.query({
      query: (studentId) => `/attendance/history?studentId=${studentId}`,
      providesTags:["Attendance"]
    }),
    getAttendanceStats: builder.query({
      query: (classId) => `/attendance/stats?classId=${classId}`,
      providesTags:["Attendance"]
    }),
    generateTodayAttendance:builder.mutation({
      query:() => ({
        url:"/attendance/generate-today",
        method:"POST"
      }),
      invalidatesTags:["Attendance"]
    })
  })
})

export const {
  useAddAttendanceMutation,
  useGetAttendanceByClassAndDateQuery,
  useGetAllAttendancesQuery,
  useGetAttendanceHistoryQuery,
  useGetAttendanceStatsQuery,
  useGenerateTodayAttendanceMutation
} = attendanceApi
