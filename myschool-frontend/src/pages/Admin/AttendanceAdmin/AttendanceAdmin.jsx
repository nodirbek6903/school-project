import { useState, useEffect } from "react";
import FilterBar from "./FilterBar";
import AttendanceTable from "./AttendanceTable";
import {
  useAddAttendanceMutation,
  useGetAttendanceByClassAndDateQuery,
} from "../../../features/attendance/attendanceApi";
import { useGetClassesQuery } from "../../../features/class/classApi";
import { useGetStudentsByClassQuery } from "../../../features/students/studentApi";
import { useGetMeQuery } from "../../../features/auth/authApi";
import { message } from "antd";

const AttendancePage = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [date, setDate] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);

  // 🔹 Login qilgan foydalanuvchi (o‘qituvchi)
  const { data: me, isLoading: meLoading } = useGetMeQuery();

  const { data: classes } = useGetClassesQuery();
  const { data: students } = useGetStudentsByClassQuery(selectedClass, {
    skip: !selectedClass,
  });
  const { data: existingAttendance } = useGetAttendanceByClassAndDateQuery(
    { classId: selectedClass, date },
    { skip: !selectedClass || !date }
  );

  const [addAttendance, { isLoading }] = useAddAttendanceMutation();

  useEffect(() => {
    if (existingAttendance?.records) {
      setAttendanceData(
        existingAttendance.records.map((r) => ({
          studentId: r.studentId._id,
          status: r.status,
          note: r.note || "",
        }))
      );
    } else if (students) {
      setAttendanceData(
        students.map((s) => ({
          studentId: s._id,
          status: "present",
          note: "",
        }))
      );
    }
  }, [existingAttendance, students]);

  const handleSave = async () => {
    if (!selectedClass) {
      message.warning("Iltimos, avval sinfni tanlang!");
      return;
    }
    if (!date) {
      message.warning("Iltimos, sanani tanlang!");
      return;
    }

    try {
      await addAttendance({
        classId: selectedClass,
        date,
        records: attendanceData,
      }).unwrap();
      message.success("Davomat saqlandi.");
    } catch (error) {
      console.error(error);
      message.error("Xatolik yuz berdi!");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Davomat{" "}
      </h1>
        <span className="text-gray-700 text-lg">
          {meLoading
            ? "(Yuklanmoqda...)"
            : me
            ? `O‘qituvchi: ${me.fullName}`
            : ""}
        </span>

      <FilterBar
        classes={classes}
        selectedClass={selectedClass}
        setSelectedClass={setSelectedClass}
        date={date}
        setDate={setDate}
      />

      {students && students.length > 0 ? (
        <>
          <AttendanceTable
            students={students}
            attendanceData={attendanceData}
            setAttendanceData={setAttendanceData}
          />
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="mt-4 cursor-pointer bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {isLoading ? "Saqlanmoqda..." : "Saqlash"}
          </button>
        </>
      ) : (
        <p className="text-gray-600 mt-4">Sinf va sanani tanlang.</p>
      )}
    </div>
  );
};

export default AttendancePage;
