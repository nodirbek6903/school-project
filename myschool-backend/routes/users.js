const express = require("express");
const router = express.Router();
const {
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
  updatePassword,
} = require("../controllers/userController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/", protect, authorize("admin"), getUsers);
router.get("/:id", protect, authorize("admin"), getUserById);
router.put("/:id", protect, authorize("admin"), updateUser);
router.delete("/:id", protect, authorize("admin"), deleteUser);
router.patch("/:id/password", protect, authorize("admin"), updatePassword);

module.exports = router;
