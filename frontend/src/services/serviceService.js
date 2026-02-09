import API from "./api";

// جلب جميع الخدمات
export const getAllServices = async () => {
  try {
    const response = await API.get("/services");
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "فشل في جلب الخدمات",
    };
  }
};

// جلب خدمة واحدة
export const getServiceById = async (id) => {
  try {
    const response = await API.get(`/services/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "فشل في جلب الخدمة",
    };
  }
};

// جلب خدمات مزود محدد
export const getProviderServices = async (providerId) => {
  try {
    const response = await API.get(`/services/provider/${providerId}`);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "فشل في جلب الخدمات",
    };
  }
};

// إنشاء خدمة (للمزود فقط)
export const createService = async (serviceData) => {
  try {
    const response = await API.post("/services", serviceData);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "فشل في إنشاء الخدمة",
    };
  }
};

// تحديث خدمة
export const updateService = async (id, serviceData) => {
  try {
    const response = await API.put(`/services/${id}`, serviceData);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "فشل في تحديث الخدمة",
    };
  }
};

// حذف خدمة
export const deleteService = async (id) => {
  try {
    const response = await API.delete(`/services/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "فشل في حذف الخدمة",
    };
  }
};
