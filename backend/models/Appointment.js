const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, "يرجى تحديد التاريخ"],
  },
  time: {
    type: String, // "14:30"
    required: [true, "يرجى تحديد الوقت"],
  },
  endTime: {
    type: String, // "15:00" سيتم حسابه
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
    default: "Pending",
  },
  note: {
    type: String,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
