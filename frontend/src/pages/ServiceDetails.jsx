import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import {
  Clock,
  DollarSign,
  User,
  ArrowLeft,
  Calendar as CalendarIcon,
  Loader,
} from "lucide-react";
import MainLayout from "../components/MainLayout";
import { getServiceById } from "../services/serviceService";
import { createAppointment } from "../services/appointmentService";
import toast from "react-hot-toast";

const ServiceDetails = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const isRTL = i18n.language === "ar";

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  const [bookingData, setBookingData] = useState({
    date: "",
    time: "",
    note: "",
  });

  const fetchService = async () => {
    setLoading(true);
    const result = await getServiceById(id);

    if (result.success) {
      setService(result.data);
    } else {
      toast.error(result.error);
      navigate("/services");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchService();
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!bookingData.date || !bookingData.time) {
      toast.error(t("validation.required"));
      return;
    }

    setBooking(true);

    const appointmentData = {
      date: bookingData.date,
      time: bookingData.time,
      note: bookingData.note,
      providerId: service.providerId._id,
      serviceId: service._id,
    };

    const result = await createAppointment(appointmentData);

    if (result.success) {
      toast.success(t("booking.success"));
      navigate("/appointments");
    } else {
      toast.error(result.error);
    }

    setBooking(false);
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      slots.push(`${hour.toString().padStart(2, "0")}:00`);
      slots.push(`${hour.toString().padStart(2, "0")}:30`);
    }
    return slots;
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center py-20">
          <Loader className="animate-spin text-blue-600" size={40} />
        </div>
      </MainLayout>
    );
  }

  if (!service) {
    return null;
  }

  return (
    <MainLayout>
      <div>
        {/* Back Button */}
        <button
          onClick={() => navigate("/services")}
          className={`flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          <ArrowLeft size={20} className={isRTL ? "rotate-180" : ""} />
          <span>{t("common.back") || "رجوع"}</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Service Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Service Image */}
              <div className="h-64 bg-gradient-to-br from-blue-500 to-purple-600">
                {service.image ? (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-white text-8xl">💼</span>
                  </div>
                )}
              </div>

              {/* Service Details */}
              <div className="p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  {service.title}
                </h1>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description || "لا يوجد وصف متاح"}
                </p>

                {/* Info Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="text-blue-600" size={20} />
                      <span className="text-sm text-gray-600">
                        {t("services.price")}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">
                      {service.price} SAR
                    </p>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="text-purple-600" size={20} />
                      <span className="text-sm text-gray-600">
                        {t("services.duration")}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-purple-600">
                      {service.duration} {t("services.minutes")}
                    </p>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="text-green-600" size={20} />
                      <span className="text-sm text-gray-600">المزود</span>
                    </div>
                    <p className="text-lg font-bold text-green-600 line-clamp-1">
                      {service.providerId?.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-20">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <CalendarIcon size={24} className="text-blue-600" />
                <span>{t("booking.title") || "احجز موعدك"}</span>
              </h2>

              <form onSubmit={handleBooking} className="space-y-4">
                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("booking.selectDate")}
                  </label>
                  <input
                    type="date"
                    value={bookingData.date}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, date: e.target.value })
                    }
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("booking.selectTime")}
                  </label>
                  <select
                    value={bookingData.time}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, time: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">{t("booking.selectTime")}</option>
                    {generateTimeSlots().map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Note */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("booking.addNote")}
                  </label>
                  <textarea
                    value={bookingData.note}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, note: e.target.value })
                    }
                    rows="3"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder={
                      t("booking.notePlaceholder") || "Add any notes..."
                    }
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={booking}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {booking ? t("common.loading") : t("booking.confirm")}
                </button>
              </form>

              {/* Info Box */}
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                {/* <p className="text-sm text-blue-800">
                  💡 سيتم إرسال تأكيد الحجز عبر البريد الإلكتروني
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ServiceDetails;
