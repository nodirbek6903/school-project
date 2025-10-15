import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { authApi } from "../features/auth/authApi";
import { staffApi } from "../features/staff/staffApi";
import { classApi } from "../features/class/classApi";
import { studentApi } from "../features/students/studentApi";
import { teachersApi } from "../features/teachers/teachersApi";
import { subjectApi } from "../features/subjects/subjectApi";
import {timetableApi} from "../features/timetable/timetableApi"
import {bookApi} from "../features/librarys/booksApi"
import {bookRecordApi} from "../features/librarys/bookRecordsApi"
import {attendanceApi} from "../features/attendance/attendanceApi"
import {newsApi} from "../features/news/newsApi"
import {eventApi} from "../features/events/eventApi"
import {filesApi} from "../features/files/filesApi"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [staffApi.reducerPath]: staffApi.reducer,
    [classApi.reducerPath]: classApi.reducer,
    [studentApi.reducerPath]: studentApi.reducer,
    [teachersApi.reducerPath]: teachersApi.reducer,
    [subjectApi.reducerPath]: subjectApi.reducer,
    [timetableApi.reducerPath]: timetableApi.reducer,
    [bookApi.reducerPath]: bookApi.reducer,
    [bookRecordApi.reducerPath]: bookRecordApi.reducer,
    [attendanceApi.reducerPath]: attendanceApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [eventApi.reducerPath]: eventApi.reducer,
    [filesApi.reducerPath]: filesApi.reducer
  },
  middleware: (getDefault) =>
    getDefault().concat(
      authApi.middleware,
      staffApi.middleware,
      classApi.middleware,
      studentApi.middleware,
      teachersApi.middleware,
      subjectApi.middleware,
      timetableApi.middleware,
      bookApi.middleware,
      bookRecordApi.middleware,
      attendanceApi.middleware,
      newsApi.middleware,
      eventApi.middleware,
      filesApi.middleware
    ),
});
