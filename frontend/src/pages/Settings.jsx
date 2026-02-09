import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import {
  Settings as SettingsIcon,
  User,
  Lock,
  Globe,
  Bell,
  AlertTriangle,
  Save,
} from "lucide-react";
import MainLayout from "../components/MainLayout";
import toast from "react-hot-toast";

const Settings = () => {
  const { t, i18n } = useTranslation();
  const { user, fetchUser, logout } = useAuth();

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [notifications, setNotifications] = useState({
    bookingEmails: true,
    reminderEmails: true,
  });

  const [loading, setLoading] = useState(false);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    toast.success(
      lang === "ar"
        ? "تم تغيير اللغة بنجاح"
        : lang === "fr"
        ? "Langue changée avec succès"
        : "Language changed successfully"
    );
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    // محاكاة API call
    setTimeout(() => {
      toast.success(t("settings.profileUpdated"));
      setLoading(false);
      // في التطبيق الحقيقي: استدعاء API لتحديث البيانات
      // fetchUser();
    }, 1000);
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      toast.error(t("validation.passwordMatch"));
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error(t("validation.minLength"));
      return;
    }

    setLoading(true);

    // محاكاة API call
    setTimeout(() => {
      toast.success(t("settings.passwordUpdated"));
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      setLoading(false);
    }, 1000);
  };

  const handleDeleteAccount = () => {
    if (window.confirm(t("settings.deleteConfirm"))) {
      // في التطبيق الحقيقي: استدعاء API لحذف الحساب
      toast.error("تم حذف الحساب");
      setTimeout(() => logout(), 2000);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <SettingsIcon className="text-blue-600" size={32} />
            {t("settings.title")}
          </h1>
          <p className="text-gray-600">إدارة إعدادات حسابك وتفضيلاتك</p>
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="text-blue-600" size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">
              {t("settings.profile")}
            </h2>
          </div>

          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("settings.name")}
                </label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData({ ...profileData, name: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("settings.email")}
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData({ ...profileData, email: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("settings.phone")}
                </label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) =>
                    setProfileData({ ...profileData, phone: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Role (Read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("settings.role")}
                </label>
                <input
                  type="text"
                  value={t(`auth.${user?.role}`)}
                  disabled
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition disabled:opacity-50"
            >
              <Save size={18} />
              {t("settings.updateProfile")}
            </button>
          </form>
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <Lock className="text-red-600" size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">
              {t("settings.changePassword")}
            </h2>
          </div>

          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("settings.currentPassword")}
              </label>
              <input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    currentPassword: e.target.value,
                  })
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("settings.newPassword")}
                </label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("settings.confirmNewPassword")}
                </label>
                <input
                  type="password"
                  value={passwordData.confirmNewPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmNewPassword: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-medium transition disabled:opacity-50"
            >
              <Lock size={18} />
              {t("settings.updatePassword")}
            </button>
          </form>
        </div>

        {/* Language Settings */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Globe className="text-purple-600" size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">
              {t("settings.language")}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => handleLanguageChange("en")}
              className={`p-4 rounded-lg border-2 transition ${
                i18n.language === "en"
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-300 hover:border-blue-300"
              }`}
            >
              <p className="font-semibold text-gray-800">
                {t("settings.english")}
              </p>
              <p className="text-sm text-gray-600 mt-1">English</p>
            </button>

            <button
              onClick={() => handleLanguageChange("ar")}
              className={`p-4 rounded-lg border-2 transition ${
                i18n.language === "ar"
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-300 hover:border-blue-300"
              }`}
            >
              <p className="font-semibold text-gray-800">
                {t("settings.arabic")}
              </p>
              <p className="text-sm text-gray-600 mt-1">العربية</p>
            </button>

            <button
              onClick={() => handleLanguageChange("fr")}
              className={`p-4 rounded-lg border-2 transition ${
                i18n.language === "fr"
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-300 hover:border-blue-300"
              }`}
            >
              <p className="font-semibold text-gray-800">
                {t("settings.french")}
              </p>
              <p className="text-sm text-gray-600 mt-1">Français</p>
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Bell className="text-green-600" size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">
              {t("settings.notifications")}
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">
                  {t("settings.receiveBookingEmails")}
                </p>
                <p className="text-sm text-gray-600">
                  استلام إشعارات عند تأكيد الحجز
                </p>
              </div>
              <label className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  checked={notifications.bookingEmails}
                  onChange={(e) =>
                    setNotifications({
                      ...notifications,
                      bookingEmails: e.target.checked,
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-gray-300 peer-checked:bg-blue-600 rounded-full peer transition"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-6 transition"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">
                  {t("settings.receiveReminderEmails")}
                </p>
                <p className="text-sm text-gray-600">
                  استلام تذكير قبل الموعد بـ 24 ساعة
                </p>
              </div>
              <label className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  checked={notifications.reminderEmails}
                  onChange={(e) =>
                    setNotifications({
                      ...notifications,
                      reminderEmails: e.target.checked,
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-gray-300 peer-checked:bg-blue-600 rounded-full peer transition"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-6 transition"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="text-red-600" size={20} />
            </div>
            <h2 className="text-xl font-bold text-red-800">
              {t("settings.dangerZone")}
            </h2>
          </div>

          <p className="text-red-700 mb-4">
            {t("settings.deleteAccountWarning")}
          </p>

          <button
            onClick={handleDeleteAccount}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-medium transition"
          >
            {t("settings.deleteAccountButton")}
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
