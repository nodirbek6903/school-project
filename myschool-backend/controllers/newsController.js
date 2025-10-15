const News = require("../models/News");

const getNews = async (req, res) => {
  try {
    const news = await News.find().sort({ date: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};

const getNewsById = async (req, res) => {
  try {
    const newsItem = await News.findById(req.params.id);
    if (!newsItem) {
      return res.status(404).json({ message: "Yangilik topilmadi" });
    }
    res.json(newsItem);
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};

const createNews = async (req, res) => {
  try {
    const { title, content, date } = req.body;

    const news = new News({
      title,
      content,
      date: date || new Date(),
      image: req.file ? req.file.filename : null,
    });

    const createdNews = await news.save();
    res.status(201).json(createdNews);
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};

const updateNews = async (req, res) => {
  try {
    const { title, content, date } = req.body;

    const newsItem = await News.findById(req.params.id);
    if (!newsItem) {
      return res.status(404).json({ message: "Yangiliklar topilmadi" });
    }
    newsItem.title = title || newsItem.title;
    newsItem.content = content || newsItem.content;
    newsItem.date = date || newsItem.date;

    if (req.file) {
      newsItem.image = req.file.filename;
    }

    const updatedNews = await newsItem.save();
    res.json(updatedNews);
  } catch (error) {
    res.status(500).json({ message: "Server xatosi", error: error.message });
  }
};

const deleteNews = async (req, res) => {
  try {
    const newsItem = await News.findById(req.params.id);
    if (!newsItem) {
      return res.status(404).json({ message: "Yangilik topilmadi" });
    }
    await newsItem.deleteOne();
    res.json({ message: "yangilik o'chirildi" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Yangilik o'chirildi", error: error.message });
  }
};

module.exports = {
  getNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
};
