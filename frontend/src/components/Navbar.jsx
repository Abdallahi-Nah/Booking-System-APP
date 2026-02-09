import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import { Calendar, Menu, X, LogOut, User, Settings } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === "ar";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks =
    user?.role === "provider"
      ? [
          { to: "/dashboard", label: t("nav.dashboard") },
          { to: "/my-services", label: t("nav.myServices") },
          { to: "/appointments", label: t("nav.appointments") },
        ]
      : [
          { to: "/services", label: t("nav.services") },
          { to: "/appointments", label: t("nav.appointments") },
        ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Calendar className="text-white" size={24} />
              </div>
              <span className="font-bold text-xl text-gray-800">
                AppointmentPro
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-700 hover:text-blue-600 font-medium transition"
              >
                {link.label}
              </Link>
            ))}

            {/* User Menu */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="text-white" size={18} />
                </div>
                <span className="text-sm font-medium">{user?.name}</span>
              </button>

              {/* Dropdown */}
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link
                  to="/settings"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-t-lg"
                >
                  <Settings size={18} />
                  <span>{t("nav.settings")}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-red-600 rounded-b-lg"
                >
                  <LogOut size={18} />
                  <span>{t("nav.logout")}</span>
                </button>
              </div>
            </div>

            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/settings"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              {t("nav.settings")}
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-red-50 text-red-600"
            >
              {t("nav.logout")}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
