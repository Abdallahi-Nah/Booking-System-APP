const Appointment = require("../models/Appointment");
const Service = require("../models/Service");

// دالة مساعدة لحساب endTime
const calculateEndTime = (timeStr, durationMinutes) => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes + durationMinutes);
  return date.toTimeString().slice(0, 5); // "15:30"
};

// @desc    حجز موعد جديد
// @route   POST /api/appointments
const createAppointment = async (req, res) => {
  try {
    const { date, time, note, providerId, serviceId } = req.body;

    // 1. جلب بيانات الخدمة لمعرفة مدة التنفيذ
    const service = await Service.findById(serviceId);

    if (!service || service.isActive === false) {
      return res
        .status(400)
        .json({ success: false, message: "الخدمة غير متاحة" });
    }

    // 2. حساب endTime تلقائياً
    const endTime = calculateEndTime(time, service.duration);

    // 3. إنشاء الموعد
    const appointment = await Appointment.create({
      date,
      time,
      endTime,
      note,
      customerId: req.user.id,
      providerId,
      serviceId,
    });

    // 4. إعادة البيانات مع تفاصيل الخدمة والعميل (Populate)
    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate("customerId", "name phone")
      .populate("providerId", "name phone")
      .populate("serviceId", "title price");

    res.status(201).json({ success: true, data: populatedAppointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    جلب مواعيد المستخدم الحالية
// @route   GET /api/appointments
// @desc    Get appointments
// @route   GET /api/appointments
// @access  Private
const getAppointments = async (req, res) => {
  try {
    let query = {};

    // Filter based on user role
    if (req.user.role === "customer") {
      query.customerId = req.user._id;
    } else if (req.user.role === "provider") {
      query.providerId = req.user._id;
    }

    const appointments = await Appointment.find(query)
      .populate("serviceId", "name title price duration")
      .populate("customerId", "name email")
      .populate("providerId", "name email")
      .sort({ date: -1 });

    // تحويل الأسماء لتطابق Frontend
    const formattedAppointments = appointments.map(apt => ({
      ...apt.toObject(),
      service: apt.serviceId,
      customer: apt.customerId,
      provider: apt.providerId
    }));

    res.json(formattedAppointments);
  } catch (error) {
    console.error("Get appointments error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    تحديث حالة الموعد
// @route   PUT /api/appointments/:id
const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    حذف موعد
// @route   DELETE /api/appointments/:id
const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'الموعد غير موجود' });
    }

    // السماح بالحذف للعميل الذي قام بالحجز أو للمزود
    const isOwner = appointment.customerId.toString() === req.user.id;
    const isProvider = appointment.providerId.toString() === req.user.id;

    if (!isOwner && !isProvider) {
      return res.status(401).json({ success: false, message: 'غير مصرح لك بحذف هذا الموعد' });
    }

    await appointment.deleteOne();
    res.status(200).json({ success: true, message: 'تم حذف الموعد بنجاح' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
  deleteAppointment,
};
