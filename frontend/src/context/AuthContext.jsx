import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import API from "../services/api";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = Cookies.get("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => Cookies.get("token") || null);
  const [loading, setLoading] = useState(false);

  // تسجيل الدخول
  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await API.post("/auth/login", { email, password });

      const { user: userData, token: userToken } = response.data.data;

      // حفظ في Cookies
      Cookies.set("token", userToken, { expires: 30 });
      Cookies.set("user", JSON.stringify(userData), { expires: 30 });

      setUser(userData);
      setToken(userToken);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "خطأ في تسجيل الدخول",
      };
    } finally {
      setLoading(false);
    }
  };

  // التسجيل
  const register = async (name, email, password, role, phone) => {
    try {
      setLoading(true);
      const response = await API.post("/auth/register", {
        name,
        email,
        password,
        role,
        phone,
      });

      const { user: userData, token: userToken } = response.data.data;

      // حفظ في Cookies
      Cookies.set("token", userToken, { expires: 30 });
      Cookies.set("user", JSON.stringify(userData), { expires: 30 });

      setUser(userData);
      setToken(userToken);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "خطأ في التسجيل",
      };
    } finally {
      setLoading(false);
    }
  };

  // تسجيل الخروج
  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setUser(null);
    setToken(null);
  };

  // جلب بيانات المستخدم الحالي
  const fetchUser = async () => {
    try {
      const response = await API.get("/auth/me");
      const userData = response.data.data;

      setUser(userData);
      Cookies.set("user", JSON.stringify(userData), { expires: 30 });
    } catch (error) {
      console.error("Error fetching user:", error);
      logout();
    }
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token,
    login,
    register,
    logout,
    fetchUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
