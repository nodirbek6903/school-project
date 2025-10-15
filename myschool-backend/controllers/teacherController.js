const Teacher = require("../models/Teacher");
const User = require("../models/User")

const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find()
      .populate("subjects", "name").populate("user").populate("user","fullName email role")
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};

const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id)
      .populate("subjects", "name");
    if (!teacher) {
      return res.status(404).json({ message: "O'qituvchi topilmadi" });
    }
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};

const createTeacher = async (req, res) => {
  try {
    let { firstName, lastName, subjects } = req.body;

    if (subjects && !Array.isArray(subjects)) {
      subjects = [subjects];
    }

    const teacher = new Teacher({
      firstName,
      lastName,
      subjects,
      photo: req.file ? req.file.filename : null,
    });

    const createdTeacher = await teacher.save();
    res.status(201).json(createdTeacher);
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};

const updateTeacher = async (req, res) => {
  try {
    let { firstName, lastName, subjects, assignedClass } = req.body;

    if (subjects) {
      if (typeof subjects === "string") {
        subjects = [subjects];
      } else if (Array.isArray(subjects)) {
        subjects = subjects.map((s) => (typeof s === "object" ? s._id || s.value : s));
      }
    }

    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: "O'qituvchi topilmadi" });
    }

    teacher.firstName = firstName || teacher.firstName;
    teacher.lastName = lastName || teacher.lastName;
    teacher.subjects = subjects || teacher.subjects;

    if (req.file) {
      teacher.photo = req.file.filename;
    }

    const updatedTeacher = await teacher.save();
    res.json(updatedTeacher);
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};


const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: "O'qituvchi topilmadi" });
    }
    await teacher.deleteOne();
    res.json({ message: "O'qituvchi o'chirildi" });
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};

const registerTeacherUser = async (req,res) => {
  try {
    const {teacherId,email,password} = req.body

    const teacher = await Teacher.findById(teacherId)
    if(!teacher){
      return res.status(404).json({message:"O'qituvchi topilmadi"})
    }

    const userExists = await User.findOne({email})
    if(userExists){
      return res.status(400).json({message:"Bu email allaqachon ishlatilgan"})
    }

    const user = await User.create({
      fullName:`${teacher.firstName} ${teacher.lastName}`,
      email,
      password,
      role:"teacher"
    })
     teacher.user = user._id
     await teacher.save()

     res.status(201).json({
      message:"O'qituvchi tizimga kirish uchun ro'yxatdan o'tkzaildi",
      user
     })
  } catch (error) {
    console.error(error)
    res.status(500).json({message:"Server xatosi"})
  }
}

module.exports = {
  getTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  registerTeacherUser
};
