import { Routes, Route } from "react-router-dom";
import AdminLayout from "../components/adminlayout/AdminLayout";
import PrivateRoute from "./PrivateRoute";

// --- admin sahifalar ---
import AdminDashboard from "../pages/Admin/Dashboard";
import StudentsAdmin from "../pages/Admin/StudentsAdmin/StudentsAdmin";
import ClassAdmin from "../pages/Admin/ClassAdmin/ClassAdmin";
import TeachersAdmin from "../pages/Admin/Teachers/TeachersAdmin";
import FilesAdmin from "../pages/Admin/FilesAdmin/FilesAdmin";
import StaffAdmin from "../pages/Admin/Staff/StaffAdmin";
import TimetableAdmin from "../pages/Admin/TimetableAdmin/TimetableAdmin";
import GradeAdmin from "../pages/Admin/GradeAdmin/GradeAdmin";
import NewsAdmin from "../pages/Admin/News/NewsAdmin";
import EventAdmin from "../pages/Admin/Events/EventAdmin";
import BookAdmin from "../pages/Admin/Librarys/BookAdmin";
import BookRecordAdmin from "../pages/Admin/Librarys/BookRecordAdmin";
import SubjectAdmin from "../pages/Admin/SubjectAdmin/SubjectsAdmin";
import AttendanceAdmin from "../pages/Admin/AttendanceAdmin/AttendanceAdmin";

// --- teacher sahifalar ---
import TeacherDashboard from "../pages/Teacher/Dashboard";
import TeacherClasses from "../pages/Teacher/Classes";
import TeacherGrades from "../pages/Teacher/Grades";
import TeacherAttendance from "../pages/Teacher/Attendance";
import TeacherFiles from "../pages/Teacher/Files";

// --- student sahifalar ---
import StudentDashboard from "../pages/Student/Dashboard";
import StudentGrades from "../pages/Student/Grades";
import StudentAttendance from "../pages/Student/Attendance";
import StudentNews from "../pages/Student/News";
import StudentFiles from "../pages/Student/Files";

// --- librarian sahifalar ---
import LibrarianBooks from "../pages/Librarian/Books";
import LibrarianRecords from "../pages/Librarian/Records";

// --- staff sahifalar ---
import StaffDashboard from "../pages/Staff/Dashboard";
import StaffFiles from "../pages/Staff/Files";

const AppRoutes = () => {
  const role = localStorage.getItem("role");
  return (
    <Routes>
      {/* ADMIN */}
      <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
        <Route
          path="/admin/*"
          element={<AdminLayout role={role}  />}
        >
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="students" element={<StudentsAdmin />} />
          <Route path="classes" element={<ClassAdmin />} />
          <Route path="classes/timetable" element={<TimetableAdmin />} />
          <Route path="classes/grades" element={<GradeAdmin />} />
          <Route path="classes/attendance" element={<AttendanceAdmin />} />
          <Route path="teachers" element={<TeachersAdmin />} />
          <Route path="files" element={<FilesAdmin />} />
          <Route path="staff" element={<StaffAdmin />} />
          <Route path="news" element={<NewsAdmin />} />
          <Route path="events" element={<EventAdmin />} />
          <Route path="books" element={<BookAdmin />} />
          <Route path="library-records" element={<BookRecordAdmin />} />
          <Route path="subjects" element={<SubjectAdmin />} />
        </Route>
      </Route>

      {/* TEACHER */}
      <Route element={<PrivateRoute allowedRoles={["teacher"]} />}>
        <Route
          path="/teacher/*"
          element={<AdminLayout role={role}  />}
        >
          <Route index element={<TeacherDashboard />} />
          <Route path="dashboard" element={<TeacherDashboard />} />
          <Route path="classes" element={<TeacherClasses />} />
          <Route path="grades" element={<TeacherGrades />} />
          <Route path="attendance" element={<TeacherAttendance />} />
          <Route path="files" element={<TeacherFiles />} />
        </Route>
      </Route>

      {/* STUDENT */}
      <Route element={<PrivateRoute allowedRoles={["student"]} />}>
        <Route
          path="/student/*"
          element={<AdminLayout role={role} />}
        >
          <Route index element={<StudentDashboard />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="grades" element={<StudentGrades />} />
          <Route path="attendance" element={<StudentAttendance />} />
          <Route path="news" element={<StudentNews />} />
          <Route path="files" element={<StudentFiles />} />
        </Route>
      </Route>

      {/* LIBRARIAN */}
      <Route element={<PrivateRoute allowedRoles={["librarian"]} />}>
        <Route
          path="/librarian/*"
          element={<AdminLayout role={role}  />}
        >
          <Route index element={<LibrarianBooks />} />
          <Route path="books" element={<LibrarianBooks />} />
          <Route path="library-records" element={<LibrarianRecords />} />
        </Route>
      </Route>

      {/* STAFF */}
      <Route element={<PrivateRoute allowedRoles={["staff"]} />}>
        <Route
          path="/staff/*"
          element={<AdminLayout role={role} />}
        >
          <Route index element={<StaffDashboard />} />
          <Route path="dashboard" element={<StaffDashboard />} />
          <Route path="files" element={<StaffFiles />} />
        </Route>
      </Route>

    </Routes>
  );
};

export default AppRoutes;
