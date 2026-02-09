// controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @desc    تسجيل مستخدم جديد (عميل أو مزود خدمة)
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;

    // 1. التحقق من وجود المستخدم
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "البريد الإلكتروني مستخدم بالفعل" });
    }

    // 2. تشفير كلمة المرور
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. إنشاء المستخدم
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "customer",
      phone,
    });

    // 4. إنشاء التوكن
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(201).json({
      success: true,
      message: "تم إنشاء الحساب بنجاح",
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
        },
        token,
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    تسجيل الدخول
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. التحقق من وجود المستخدم
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "بيانات الدخول غير صحيحة" });
    }

    // 2. مقارنة كلمة المرور
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "بيانات الدخول غير صحيحة" });
    }

    // 3. إنشاء التوكن
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({
      success: true,
      message: "تم تسجيل الدخول بنجاح",
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
        },
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    جلب بيانات المستخدم الحالي (من أنا؟)
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    // req.user يتم تعبئته تلقائياً بواسطة middleware 'protect'
    const user = await User.findById(req.user.id).select('-password'); 

    if (!user) {
      return res.status(404).json({ success: false, message: 'المستخدم غير موجود' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { registerUser, loginUser, getMe };
