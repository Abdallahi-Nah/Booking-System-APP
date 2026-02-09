import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "ar", label: "العربية", flag: "🇸🇦" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
  ];

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
        <Globe size={20} />
        <span className="hidden sm:inline">
          {languages.find((l) => l.code === i18n.language)?.flag || "🌐"}
        </span>
      </button>

      <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 ${
              i18n.language === lang.code ? "bg-blue-50 text-blue-600" : ""
            }`}
          >
            <span>{lang.flag}</span>
            <span className="text-sm">{lang.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
