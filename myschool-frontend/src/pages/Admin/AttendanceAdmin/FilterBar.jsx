import React, { useEffect, useState } from "react";

const FilterBar = ({ classes, selectedClass, setSelectedClass, date, setDate }) => {
  const [classTeacher, setClassTeacher] = useState(null);

  // Sinf tanlanganda o‘sha sinfni topamiz
  useEffect(() => {
    if (selectedClass && classes?.length > 0) {
      const foundClass = classes.find((cls) => cls._id === selectedClass);
      setClassTeacher(foundClass?.classTeacher || null);
    } else {
      setClassTeacher(null);
    }
  }, [selectedClass, classes]);

  return (
    <>
      <div className="flex flex-wrap items-center gap-4 mb-6 bg-white shadow p-4 rounded-lg">
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="border p-2 rounded w-40"
        >
          <option value="">Sinf tanlang</option>
          {classes?.map((cls) => (
            <option key={cls._id} value={cls._id}>
              {cls.name} - sinf
            </option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      {classTeacher && (
        <div className="bg-gray-50 p-3 rounded shadow-sm mb-4">
          <span className="text-gray-700 font-medium">
            📘 Sinf rahbari:{" "}
            <span className="font-semibold text-blue-600 text-lg">
              {classTeacher.firstName} {classTeacher.lastName}
            </span>
          </span>
        </div>
      )}
    </>
  );
};

export default FilterBar;
