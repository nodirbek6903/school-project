
const AttendanceTable = ({ students, attendanceData, setAttendanceData }) => {


  const handleStatusChange = (studentId, status) => {
    const updated = attendanceData.map((r) =>
      r.studentId === studentId ? { ...r, status } : r
    );
    setAttendanceData(updated);
  };

  const handleNoteChange = (studentId, note) => {
    const updated = attendanceData.map((r) =>
      r.studentId === studentId ? { ...r, note } : r
    );
    setAttendanceData(updated);
  };

  return (
    <table className="w-full border-collapse bg-white shadow rounded-lg">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="p-2 border w-10">#</th>
          <th className="p-2 border">O‘quvchi</th>
          <th className="p-2 border w-32">Holat</th>
          <th className="p-2 border">Izoh</th>
        </tr>
      </thead>
      <tbody>
        {students?.map((student, i) => {
          const record = attendanceData?.find((r) => r.studentId === student._id) || {};
          return (
            <tr key={student._id} className="hover:bg-gray-50">
              <td className="p-2 border text-center">{i + 1}</td>
              <td className="p-2 border">
                {student.firstName} {student.lastName}
              </td>
              <td className="p-2 border">
                <select
                  value={record.status || "present"}
                  onChange={(e) => handleStatusChange(student._id, e.target.value)}
                  className="border p-1 rounded w-full"
                >
                  <option value="present">Keldi</option>
                  <option value="absent">Kelmagan</option>
                </select>
              </td>
              <td className="p-2 border">
                <input
                  type="text"
                  placeholder="Izoh qoldiring (ixtiyoriy)..."
                  value={record.note || ""}
                  onChange={(e) => handleNoteChange(student._id, e.target.value)}
                  className="border p-1 rounded w-full"
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default AttendanceTable;
