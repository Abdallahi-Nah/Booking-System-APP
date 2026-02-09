import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  Package,
  Calendar,
  Clock,
  CheckCircle,
  DollarSign,
  Plus,
  ArrowRight,
  Loader,
} from "lucide-react";
import MainLayout from "../components/MainLayout";
import StatsCard from "../components/StatsCard";
import { getAppointments } from "../services/appointmentService";
import { getProviderServices } from "../services/serviceService";
import { format } from "date-fns";
import { ar, fr } from "date-fns/locale";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const isRTL = i18n.language === "ar";

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalServices: 0,
    totalAppointments: 0,
    pendingAppointments: 0,
    confirmedAppointments: 0,
    completedAppointments: 0,
    totalRevenue: 0,
  });
  const [recentAppointments, setRecentAppointments] = useState([]);

  const fetchDashboardData = async () => {
    setLoading(true);

    try {
      // جلب المواعيد
      const appointmentsResult = await getAppointments();

      if (appointmentsResult.success) {
        const appointments = appointmentsResult.data;

        // حساب الإحصائيات
        const pending = appointments.filter(
          (a) => a.status === "Pending"
        ).length;
        const confirmed = appointments.filter(
          (a) => a.status === "Confirmed"
        ).length;
        const completed = appointments.filter(
          (a) => a.status === "Completed"
        ).length;

        // حساب الإيرادات (للمزود فقط)
        let revenue = 0;
        if (user?.role === "provider") {
          revenue = appointments
            .filter((a) => a.status === "Completed")
            .reduce(
              (sum, a) => sum + (a.serviceId?.price || a.service?.price || 0),
              0
            );
        }

        setStats((prev) => ({
          ...prev,
          totalAppointments: appointments.length,
          pendingAppointments: pending,
          confirmedAppointments: confirmed,
          completedAppointments: completed,
          totalRevenue: revenue,
        }));

        // آخر 5 مواعيد
        setRecentAppointments(appointments.slice(0, 5));
      }

      // جلب الخدمات (للمزود فقط)
      if (user?.role === "provider" && user?._id) {
        const servicesResult = await getProviderServices(user._id);

        if (servicesResult.success) {
          setStats((prev) => ({
            ...prev,
            totalServices: servicesResult.data.length,
          }));
        }
      }
    } catch (error) {
      toast.error("فشل في جلب البيانات");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const locale =
      i18n.language === "ar" ? ar : i18n.language === "fr" ? fr : undefined;
    return format(date, "PP", { locale });
  };

  const getStatusColor = (status) => {
    const colors = {
      Pending: "bg-yellow-100 text-yellow-800",
      Confirmed: "bg-green-100 text-green-800",
      Cancelled: "bg-red-100 text-red-800",
      Completed: "bg-blue-100 text-blue-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
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

  return (
    <MainLayout>
      <div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <LayoutDashboard className="text-blue-600" size={32} />
            {t("dashboard.title")}
          </h1>
          <p className="text-gray-600">
            {t("dashboard.welcome")}, {user?.name}! 👋
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {user?.role === "provider" && (
            <StatsCard
              title={t("dashboard.stats.totalServices")}
              value={stats.totalServices}
              icon={Package}
              color="blue"
            />
          )}

          <StatsCard
            title={t("dashboard.stats.totalAppointments")}
            value={stats.totalAppointments}
            icon={Calendar}
            color="purple"
          />

          <StatsCard
            title={t("dashboard.stats.pendingAppointments")}
            value={stats.pendingAppointments}
            icon={Clock}
            color="yellow"
          />

          <StatsCard
            title={t("dashboard.stats.confirmedAppointments")}
            value={stats.confirmedAppointments}
            icon={CheckCircle}
            color="green"
          />

          {user?.role === "provider" && (
            <StatsCard
              title={t("dashboard.stats.totalRevenue")}
              value={`${stats.totalRevenue} ${t("services.currency")}`}
              icon={DollarSign}
              color="green"
              subtext={t("dashboard.stats.thisMonth")}
            />
          )}
        </div>

        {/* Quick Actions */}
        {user?.role === "provider" && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {t("dashboard.quickActions")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => navigate("/my-services")}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition"
              >
                <Plus size={20} />
                {t("dashboard.addService")}
              </button>
              <button
                onClick={() => navigate("/my-services")}
                className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition"
              >
                <Package size={20} />
                {t("dashboard.viewServices")}
              </button>
              <button
                onClick={() => navigate("/appointments")}
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition"
              >
                <Calendar size={20} />
                {t("dashboard.viewAppointments")}
              </button>
            </div>
          </div>
        )}

        {/* Recent Appointments */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">
              {t("dashboard.recentAppointments")}
            </h2>
            <button
              onClick={() => navigate("/appointments")}
              className={`flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              {t("dashboard.viewAll")}
              <ArrowRight size={18} className={isRTL ? "rotate-180" : ""} />
            </button>
          </div>

          {recentAppointments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      {t("appointments.service")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      {user?.role === "provider"
                        ? t("appointments.customer")
                        : t("appointments.provider")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      {t("appointments.date")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      {t("appointments.time")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      {t("appointments.status")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentAppointments.map((appointment) => (
                    <tr key={appointment._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">
                          {appointment.serviceId?.title ||
                            appointment.service?.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {user?.role === "provider"
                            ? appointment.customerId?.name ||
                              appointment.customer?.name
                            : appointment.providerId?.name ||
                              appointment.provider?.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(appointment.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {appointment.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            appointment.status
                          )}`}
                        >
                          {t(`status.${appointment.status.toLowerCase()}`)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">📅</div>
              <p className="text-gray-600">{t("dashboard.noData")}</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
