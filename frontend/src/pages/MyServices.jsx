import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import { Plus, Edit2, Trash2, Loader, Package } from "lucide-react";
import MainLayout from "../components/MainLayout";
import ServiceFormModal from "../components/ServiceFormModal";
import {
  getProviderServices,
  createService,
  updateService,
  deleteService,
} from "../services/serviceService";
import toast from "react-hot-toast";

const MyServices = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchMyServices = async () => {
    setLoading(true);
    const result = await getProviderServices(user._id);

    if (result.success) {
      setServices(result.data);
    } else {
      toast.error(result.error);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (user?._id) {
      fetchMyServices();
    }
  }, [user]);

  const handleAddNew = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    setSubmitting(true);

    const result = editingService
      ? await updateService(editingService._id, formData)
      : await createService(formData);

    if (result.success) {
      toast.success(
        editingService
          ? t("myServices.updateSuccess")
          : t("myServices.createSuccess")
      );
      setIsModalOpen(false);
      fetchMyServices();
    } else {
      toast.error(result.error);
    }

    setSubmitting(false);
  };

  const handleDelete = async (serviceId) => {
    if (!window.confirm(t("myServices.deleteConfirm"))) {
      return;
    }

    const result = await deleteService(serviceId);

    if (result.success) {
      toast.success(t("myServices.deleteSuccess"));
      fetchMyServices();
    } else {
      toast.error(result.error);
    }
  };

  return (
    <MainLayout>
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
              <Package className="text-blue-600" size={32} />
              {t("myServices.title")}
            </h1>
            <p className="text-gray-600">إدارة وتحديث خدماتك</p>
          </div>

          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition shadow-lg"
          >
            <Plus size={20} />
            {t("myServices.addNew")}
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader className="animate-spin text-blue-600" size={40} />
          </div>
        )}

        {/* Services Grid */}
        {!loading && services.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service._id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-white text-6xl">💼</span>
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        service.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {service.isActive
                        ? t("myServices.active")
                        : t("myServices.inactive")}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {service.description || t("services.description")}
                  </p>

                  {/* Info */}
                  <div className="flex items-center justify-between mb-4 text-sm">
                    <div>
                      <span className="text-gray-500">
                        {t("services.price")}:
                      </span>
                      <span className="font-bold text-blue-600 ml-1">
                        {service.price} {t("services.currency")}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">
                        {t("services.duration")}:
                      </span>
                      <span className="font-bold text-purple-600 ml-1">
                        {service.duration} {t("services.minutes")}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(service)}
                      className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
                    >
                      <Edit2 size={16} />
                      {t("myServices.edit")}
                    </button>
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition"
                    >
                      <Trash2 size={16} />
                      {t("myServices.delete")}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && services.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {t("myServices.noServices")}
            </h3>
            <p className="text-gray-600 mb-6">{t("myServices.createFirst")}</p>
            <button
              onClick={handleAddNew}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              <Plus size={20} />
              {t("myServices.addNew")}
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      <ServiceFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        service={editingService}
        loading={submitting}
      />
    </MainLayout>
  );
};

export default MyServices;
