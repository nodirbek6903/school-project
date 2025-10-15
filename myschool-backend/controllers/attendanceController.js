const Attendance = require("../models/Attendance")
const Class = require("../models/Class")
const Student = require("../models/Student")


exports.markAttendance = async (req,res) => {
  try {
    const {classId,subjectId,date,records} = req.body
    const teacherId = req.user.id

    let attendance = await Attendance.findOne({classId,date})

    if(attendance){
      attendance.records = records
      await attendance.save()
      return res.status(200).json({message:"Davomat yangilandi",attendance})
    }

    attendance = await Attendance.create({
      classId,
      subjectId,
      date,
      records,
      createdBy:teacherId
    })

    res.status(201).json({message:"Davomat saqlandi",attendance})

  } catch (error) {
    res.status(500).json({message:error.message})
  }
}


exports.getAttendanceClassAndDate = async (req,res) => {
  try {
    const {classId,date} = req.query
    const attendance = await Attendance.findOne({classId,date}).populate("records.studentId","firstName lastName")

    if(!attendance){
      return res.status(404).json({message:"Davomat topilmadi"})
    }

    res.json(attendance)

  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

exports.getAllAttendance = async (req,res) => {
  try {
    const data = await Attendance.find().populate("classId","name").populate("createdBy","firstName lastName")

    res.json(data)

  } catch (error) {
    res.status(500).json({message:error.message})
  }
}


// 🔹 1. O‘quvchi bo‘yicha tarix (GET /api/attendance/history?studentId=...)
exports.getAttendanceHistory = async (req, res) => {
  try {
    const { studentId } = req.query;

    if (!studentId)
      return res.status(400).json({ message: "studentId kiritilmadi" });

    const records = await Attendance.find({ "records.studentId": studentId })
      .select("date classId records")
      .populate("classId", "name")
      .sort({ date: -1 });

    // Har bir davomat ichidan faqat shu o‘quvchining holatini olish
    const history = records.map(item => {
      const studentRecord = item.records.find(
        r => r.studentId.toString() === studentId
      );
      return {
        className: item.classId?.name,
        date: item.date,
        status: studentRecord?.status,
        note: studentRecord?.note,
      };
    });

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🔹 2. Statistika (GET /api/attendance/stats?classId=...)
exports.getAttendanceStats = async (req, res) => {
  try {
    const { classId } = req.query;
    if (!classId)
      return res.status(400).json({ message: "classId kiritilmadi" });

    const records = await Attendance.find({ classId });

    if (!records.length)
      return res.json({ totalDays: 0, averageAttendance: 0 });

    let totalStudents = 0;
    let totalPresent = 0;
    let totalRecords = 0;

    records.forEach(day => {
      day.records.forEach(r => {
        totalRecords++;
        if (r.status === "present") totalPresent++;
      });
      totalStudents = day.records.length;
    });

    const totalDays = records.length;
    const averageAttendance = ((totalPresent / totalRecords) * 100).toFixed(1);

    res.json({
      totalDays,
      totalStudents,
      averageAttendance: Number(averageAttendance),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🔹 3. Bugungi davomatni avtomatik yaratish (POST /api/attendance/generate-today)
exports.generateTodayAttendance = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    // Barcha sinflarni olamiz
    const classes = await Class.find();

    let created = [];

    for (const cls of classes) {
      const exists = await Attendance.findOne({
        classId: cls._id,
        date: today,
      });

      if (!exists) {
        const students = await Student.find({ classId: cls._id });

        const records = students.map(s => ({
          studentId: s._id,
          status: "present", // default — keyinchalik o‘qituvchi o‘zgartiradi
        }));

        const newAttendance = await Attendance.create({
          classId: cls._id,
          date: today,
          records,
          createdBy: req.user.id,
        });

        created.push(newAttendance.classId);
      }
    }

    res.json({
      message: "Bugungi davomatlar avtomatik yaratildi",
      totalCreated: created.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};