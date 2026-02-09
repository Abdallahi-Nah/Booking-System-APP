import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import { Calendar, Filter, Loader } from "lucide-react";
import MainLayout from "../components/MainLayout";
import AppointmentCard from "../components/AppointmentCard";
import {
  getAppointments,
  deleteAppointment,
  updateAppointmentStatus,
} from "../services/appointmentService";
import toast from "react-hot-toast";

const Appointments = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all"); // all, upcoming, past

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    filterAppointments();
  }, [activeTab, appointments]);

  const fetchAppointments = async () => {
    setLoading(true);
    const result = await getAppointments();

    if (result.success) {
      setAppointments(result.data);
      setFilteredAppointments(result.data);
    } else {
      toast.error(result.error);
    }

    setLoading(false);
  };

  const filterAppointments = () => {
    const now = new Date();

    let filtered = appointments;

    if (activeTab === "upcoming") {
      filtered = appointments.filter((apt) => {
        const aptDate = new Date(apt.date);
        return (
          aptDate >= now &&
          (apt.status === "Pending" || apt.status === "Confirmed")
        );
      });
    } else if (activeTab === "past") {
      filtered = appointments.filter((apt) => {
        const aptDate = new Date(apt.date);
        return (
          aptDate < now ||
          apt.status === "Completed" ||
          apt.status === "Cancelled"
        );
      });
    }

    setFilteredAppointments(filtered);
  };

  const handleCancel = async (appointmentId) => {
    if (!window.confirm(t("appointments.cancelConfirm"))) {
      return;
    }

    const result = await updateAppointmentStatus(appointmentId, "Cancelled");

    if (result.success) {
      toast.success(t("appointments.cancelSuccess"));
      fetchAppointments();
    } else {
      toast.error(result.error);
    }
  };

  const handleUpdateStatus = async (appointmentId, status) => {
    const result = await updateAppointmentStatus(appointmentId, status);

    if (result.success) {
      toast.success(
        status === "Confirmed"
          ? t("appointments.confirmed_success")
          : t("appointments.updated_success")
      );
      fetchAppointments();
    } else {
      toast.error(result.error);
    }
  };

  const tabs = [
    { id: "all", label: t("appointments.all"), count: appointments.length },
    {
      id: "upcoming",
      label: t("appointments.upcoming"),
      count: appointments.filter((apt) => {
        const aptDate = new Date(apt.date);
        return (
          aptDate >= new Date() &&
          (apt.status === "Pending" || apt.status === "Confirmed")
        );
      }).length,
    },
    {
      id: "past",
      label: t("appointments.past"),
      count: appointments.filter((apt) => {
        const aptDate = new Date(apt.date);
        return (
          aptDate < new Date() ||
          apt.status === "Completed" ||
          apt.status === "Cancelled"
        );
      }).length,
    },
  ];

  return (
    <MainLayout>
      <div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <Calendar className="text-blue-600" size={32} />
            {t("appointments.title")}
          </h1>
          <p className="text-gray-600">
            {user?.role === "provider"
              ? t("booking.manageBookings")
              : t("booking.viewBookings")}
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-8">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2.5 rounded-lg font-medium transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader className="animate-spin text-blue-600" size={40} />
          </div>
        )}

        {/* Appointments Grid */}
        {!loading && filteredAppointments.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment._id}
                appointment={appointment}
                onCancel={handleCancel}
                onUpdateStatus={handleUpdateStatus}
                userRole={user?.role}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredAppointments.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {t("appointments.noAppointments")}
            </h3>
            <p className="text-gray-600 mb-6">
              {activeTab === "upcoming"
                ? t("appointments.noUpcoming")
                : activeTab === "past"
                ? t("appointments.empty_past")
                : t("appointments.empty_upcoming")}
            </p>
            {user?.role === "customer" && (
              <button
                onClick={() => (window.location.href = "/services")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                {t('appointments.browseServices')}
              </button>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Appointments;
