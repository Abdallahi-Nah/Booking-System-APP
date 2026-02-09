import API from "./api";

// إنشاء حجز جديد
export const createAppointment = async (appointmentData) => {
  try {
    const response = await API.post("/appointments", appointmentData);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "فشل في إنشاء الحجز",
    };
  }
};

// جلب جميع الحجوزات
export const getAppointments = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const response = await API.get(`/appointments?${queryParams}`);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "فشل في جلب الحجوزات",
    };
  }
};

// تحديث حالة الحجز
export const updateAppointmentStatus = async (id, status) => {
  try {
    const response = await API.put(`/appointments/${id}/status`, { status });
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "فشل في تحديث الحالة",
    };
  }
};

// حذف حجز
export const deleteAppointment = async (id) => {
  try {
    const response = await API.delete(`/appointments/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "فشل في حذف الحجز",
    };
  }
};
