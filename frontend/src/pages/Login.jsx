import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import { Mail, Lock, AlertCircle, Calendar } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import LanguageSwitcher from "../components/LanguageSwitcher";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login(email, password);

    if (result.success) {
      toast.success(t("auth.welcomeBack"));
      navigate("/dashboard");
    } else {
      setError(result.error);
      toast.error(result.error);
    }

    setLoading(false);
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className={`min-h-screen flex ${isRTL ? "flex-row-reverse" : ""}`}>
        {/* Left Side - Blue Section */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 p-12 flex-col justify-between text-white">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Calendar className="text-white" size={28} />
              </div>
              <h1 className="font-bold text-2xl">AppointmentPro</h1>
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl font-bold leading-tight">
                {t("auth.welcomeBack")}
              </h2>
              <p className="text-blue-100 text-lg">
                {t("auth.signInToContinue")}
              </p>
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400">
                  ★
                </span>
              ))}
            </div>
            <p className="text-white/90 mb-4">
              "Abdallahi Nah delivered a highly performant web application using the
              MERN stack. His code quality and attention to detail are
              exceptional!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold">AN</span>
              </div>
              <div>
                <p className="font-semibold">Abdallahi Nah</p>
                <p className="text-sm text-blue-200">
                  Full Stack Developer | MERN
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-gray-50">
          {/* Language Switcher */}
          <div className={`absolute top-4 ${isRTL ? "left-4" : "right-4"}`}>
            <LanguageSwitcher />
          </div>

          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {t("auth.welcomeBack")}
            </h2>
            <p className="text-gray-600 mb-8">{t("auth.signInToContinue")}</p>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-center gap-2">
                <AlertCircle size={20} />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("auth.email")}
                </label>
                <div className="relative">
                  <Mail
                    className={`absolute ${
                      isRTL ? "right-3" : "left-3"
                    } top-1/2 transform -translate-y-1/2 text-gray-400`}
                    size={20}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full ${
                      isRTL ? "pr-10 pl-4" : "pl-10 pr-4"
                    } py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("auth.password")}
                </label>
                <div className="relative">
                  <Lock
                    className={`absolute ${
                      isRTL ? "right-3" : "left-3"
                    } top-1/2 transform -translate-y-1/2 text-gray-400`}
                    size={20}
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full ${
                      isRTL ? "pr-10 pl-4" : "pl-10 pr-4"
                    } py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600"
                  />
                  <span
                    className={`${
                      isRTL ? "mr-2" : "ml-2"
                    } text-sm text-gray-600`}
                  >
                    {t("auth.rememberMe")}
                  </span>
                </label>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  {t("auth.forgotPassword")}
                </a>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 shadow-lg"
              >
                {loading ? t("common.loading") : t("auth.signIn")}
              </button>
            </form>

            {/* Register Link */}
            <p className="mt-6 text-center text-sm text-gray-600">
              {t("auth.dontHaveAccount")}{" "}
              <Link
                to="/register"
                className="text-blue-600 font-semibold hover:underline"
              >
                {t("auth.signUp")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
