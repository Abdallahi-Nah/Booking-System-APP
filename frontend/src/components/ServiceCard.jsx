import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Clock, DollarSign, User } from "lucide-react";

const ServiceCard = ({ service }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden group">
      {/* Service Image */}
      <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
        {service.image ? (
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-white text-6xl">💼</span>
          </div>
        )}

        {/* Price Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-blue-600 font-bold">
            {service.price} {t("services.currency") || "SAR"}
          </span>
        </div>
      </div>

      {/* Service Details */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
          {service.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {service.description || "لا يوجد وصف متاح"}
        </p>

        {/* Service Info */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock size={16} className="text-blue-600" />
            <span>
              {service.duration} {t("services.minutes")}
            </span>
          </div>

          {service.providerId && (
            <div className="flex items-center gap-1">
              <User size={16} className="text-blue-600" />
              <span className="line-clamp-1">{service.providerId.name}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <button
          onClick={() => navigate(`/services/${service._id}`)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold transition-colors"
        >
          {t("services.bookNow")}
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
