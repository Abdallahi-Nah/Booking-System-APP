import { useTranslation } from "react-i18next";
import {
  Calendar,
  Clock,
  User,
  MapPin,
  Trash2,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { format } from "date-fns";
import { ar, fr } from "date-fns/locale";

const AppointmentCard = ({
  appointment,
  onCancel,
  onUpdateStatus,
  userRole,
}) => {
  const { t, i18n } = useTranslation();

  const getStatusColor = (status) => {
    const colors = {
      Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Confirmed: "bg-green-100 text-green-800 border-green-200",
      Cancelled: "bg-red-100 text-red-800 border-red-200",
      Completed: "bg-blue-100 text-blue-800 border-blue-200",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const locale =
      i18n.language === "ar" ? ar : i18n.language === "fr" ? fr : undefined;
    return format(date, "PPP", { locale });
  };

  const canCancel =
    appointment.status === "Pending" || appointment.status === "Confirmed";
  const canConfirm =
    userRole === "provider" && appointment.status === "Pending";

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-800 mb-1">
            {appointment.serviceId?.title || appointment.service?.title}
          </h3>
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
              appointment.status
            )}`}
          >
            {t(`status.${appointment.status.toLowerCase()}`)}
          </div>
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold text-blue-600">
            {appointment.serviceId?.price || appointment.service?.price} SAR
          </p>
          <p className="text-xs text-gray-500">
            {appointment.serviceId?.duration || appointment.service?.duration}{" "}
            {t("services.minutes")}
          </p>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3 mb-4">
        {/* Date & Time */}
        <div className="flex items-center gap-3 text-gray-700">
          <Calendar size={18} className="text-blue-600" />
          <span className="font-medium">{formatDate(appointment.date)}</span>
          <Clock size={18} className="text-purple-600 ml-2" />
          <span className="font-medium">{appointment.time}</span>
        </div>

        {/* Customer (for Provider) */}
        {userRole === "provider" && appointment.customerId && (
          <div className="flex items-center gap-3 text-gray-700">
            <User size={18} className="text-green-600" />
            <span>
              <span className="font-medium">{t("appointments.customer")}:</span>{" "}
              {appointment.customerId.name || appointment.customer?.name}
            </span>
          </div>
        )}

        {/* Provider (for Customer) */}
        {userRole === "customer" && appointment.providerId && (
          <div className="flex items-center gap-3 text-gray-700">
            <User size={18} className="text-green-600" />
            <span>
              <span className="font-medium">{t("appointments.provider")}:</span>{" "}
              {appointment.providerId.name || appointment.provider?.name}
            </span>
          </div>
        )}

        {/* Note */}
        {appointment.note && (
          <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600">
            <span className="font-medium">{t("appointments.note")}:</span>{" "}
            {appointment.note}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-4 border-t border-gray-200">
        {canConfirm && (
          <button
            onClick={() => onUpdateStatus(appointment._id, "Confirmed")}
            className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition"
          >
            <CheckCircle size={18} />
            <span>{t("booking.confirm")}</span>
          </button>
        )}

        {canCancel && (
          <button
            onClick={() => onCancel(appointment._id)}
            className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition"
          >
            <XCircle size={18} />
            <span>{t("appointments.cancel")}</span>
          </button>
        )}

        {!canCancel && !canConfirm && (
          <div className="flex-1 text-center text-sm text-gray-500 py-2">
            {t("appointments.cannotModify")}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;
