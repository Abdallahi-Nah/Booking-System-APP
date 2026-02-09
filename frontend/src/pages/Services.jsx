import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Search, Filter, Loader } from "lucide-react";
import MainLayout from "../components/MainLayout";
import ServiceCard from "../components/ServiceCard";
import { getAllServices } from "../services/serviceService";
import toast from "react-hot-toast";

const Services = () => {
  const { t } = useTranslation();
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  

  const fetchServices = async () => {
    setLoading(true);
    const result = await getAllServices();

    if (result.success) {
      setServices(result.data);
      setFilteredServices(result.data);
    } else {
      toast.error(result.error);
    }

    setLoading(false);
  };

  const filterServices = () => {
    if (!searchTerm.trim()) {
      setFilteredServices(services);
      return;
    }

    const filtered = services.filter(
      (service) =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredServices(filtered);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    filterServices();
  }, [searchTerm, services]);

  return (
    <MainLayout>
      <div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {t("services.title")}
          </h1>
          <p className="text-gray-600">تصفح واحجز أفضل الخدمات المتاحة</p>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder={t("common.search")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filter Button (للمستقبل) */}
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <Filter size={20} />
              <span className="hidden sm:inline">{t("common.filter")}</span>
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader className="animate-spin text-blue-600" size={40} />
          </div>
        )}

        {/* Services Grid */}
        {!loading && filteredServices.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredServices.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {t("services.noServices")}
            </h3>
            <p className="text-gray-600">جرّب البحث بكلمات مختلفة</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Services;
