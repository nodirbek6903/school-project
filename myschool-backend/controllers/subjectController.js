const Subject = require("../models/Subject");

const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};

const getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({ message: "Fan topilmadi" });
    }
    res.json(subject);
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};

const createSubject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const subject = new Subject({ name, description });
    const createdSubject = await subject.save();
    res.status(201).json(createdSubject);
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};

const updateSubject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({ message: "Fan topilmadi" });
    }

    subject.name = name || subject.name;
    subject.description = description || subject.description;

    const updatedSubject = await subject.save();
    res.json(updatedSubject);
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};

const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({ message: "Fan topilmadi" });
    }

    await subject.deleteOne();
    res.json({ message: "Fan o‘chirildi" });
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};

module.exports = {
  getSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
};
