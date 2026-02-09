const express = require("express");
const router = express.Router();
const {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
  deleteAppointment,
} = require("../controllers/appointmentController");
const { protect } = require("../middleware/auth");

router.post("/", protect, createAppointment);
router.get("/", protect, getAppointments);
router.put("/:id/status", protect, updateAppointmentStatus);
router.delete('/:id', protect, deleteAppointment);    

module.exports = router;
