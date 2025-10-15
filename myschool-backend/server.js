const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const connectDB = require("./config/db")
const path = require("path")

const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/users")
const teacherRoutes = require("./routes/teachers")
const studentRoutes = require("./routes/students")
const classRoutes = require("./routes/classes")
const attendanceRoutes = require("./routes/attendance")
const gradeRoutes = require("./routes/grade")
const newsRoutes = require("./routes/news")
const eventRoutes = require("./routes/events")
const libraryRoutes = require("./routes/library")
const staffRoutes = require("./routes/staff")
const fileRoutes = require("./routes/files")
const timetableRoutes = require("./routes/Timetable")
const subjectRoutes = require("./routes/subject")

dotenv.config()
connectDB()

const app = express()
app.use(cors())
app.use(express.json())

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/students",studentRoutes)
app.use("/api/teachers", teacherRoutes)
app.use("/api/classes",classRoutes)
app.use("/api/attendance", attendanceRoutes)
app.use("/api/grades", gradeRoutes)
app.use("/api/news", newsRoutes)
app.use("/api/events", eventRoutes)
app.use("/api/library", libraryRoutes)
app.use("/api/staff",staffRoutes)
app.use("/api/files",fileRoutes)
app.use("/api/timetable",timetableRoutes)
app.use("/api/subjects",subjectRoutes)



app.get("/", (req,res) => {
    res.send("Maktab backend API ishlayabdi")
})
 
const PORT = process.env.PORT || 5000

app.listen(PORT,() => console.log(`Server running on port ${PORT}`))