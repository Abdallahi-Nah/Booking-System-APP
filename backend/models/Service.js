const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "يرجى إدخال عنوان الخدمة"],
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, "يرجى إدخال السعر"],
  },
  duration: {
    type: Number, // بالدقائق
    required: [true, "يرجى إدخال مدة الخدمة"],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String,
  },
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Service", ServiceSchema);
