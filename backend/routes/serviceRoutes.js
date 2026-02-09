const express = require("express");
const router = express.Router();
const {
  createService,
  getAllServices,
  getProviderServices,
  getServiceById,
  updateService,
  deleteService,
} = require("../controllers/serviceController");
const { protect } = require("../middleware/auth");

// Public route - get all services
router.get("/", getAllServices);

// Protected routes
router.post("/", protect, createService);
router.get("/provider/:id", protect, getProviderServices);
router.get("/:id", getServiceById);
router.put("/:id", protect, updateService);
router.delete("/:id", protect, deleteService);

module.exports = router;
