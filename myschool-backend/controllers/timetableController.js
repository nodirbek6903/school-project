const Timetable = require("../models/Timetable");

const createTimetable = async (req, res) => {
  try {
    const timetable = await Timetable.create(req.body);
    res.status(201).json(timetable);
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};

const getAllTimetables = async (req, res) => {
  try {
    const timetables = await Timetable.find()
      .populate("class", "name")
      .populate("teacher", "firstName lastName")
      .populate("subject", "name");
    res.json(timetables);
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};

const getTimetableByClass = async (req, res) => {
  try {
    const timetables = await Timetable.find({ class: req.params.classId })
      .populate("class", "name")
      .populate("teacher", "firstName lastName")
      .populate("subject", "name");
    res.json(timetables);
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};

const updateTimetable = async (req, res) => {
  try {
    const timetable = await Timetable.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!timetable) {
      return res.status(404).json({ message: "Jadval topilmadi" });
    }
    res.json(timetable);
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};

const deleteTimetable = async (req, res) => {
  try {
    const timetable = await Timetable.findByIdAndDelete(req.params.id);
    if (!timetable) {
      return res.status(404).json({ message: "Jadval topilmadi" });
    }
    res.json({ message: "Jadval o'chirildi" });
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};

module.exports = {
  createTimetable,
  getAllTimetables,
  getTimetableByClass,
  updateTimetable,
  deleteTimetable,
};

