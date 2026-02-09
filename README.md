# 📅 AppointmentPro - Professional Booking System

<div align="center">

![AppointmentPro](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?logo=mongodb)

A modern, full-stack appointment booking system built with the MERN stack (MongoDB, Express, React, Node.js).

[Live Demo](https://booking-system-app-j3mb.vercel.app/) 

</div>

---

## 📸 Screenshots

<div align="center">

### 🔐 Authentication
<img src="./screenshots/login-ar.png" alt="Login Page" width="45%">
<img src="./screenshots/register-ar.png" alt="Register Page" width="45%">
<img src="./screenshots/register-en.png" alt="Register Page" width="45%">

### 📊 Dashboard
<img src="./screenshots/dashboard-ar-provider.png" alt="Provider Dashboard" width="45%">
<img src="./screenshots/dashboard-fr-provider.png" alt="Customer Dashboard" width="45%">
<img src="./screenshots/dashboard-customer.png" alt="Customer Dashboard" width="45%">

### 💼 Services Management
<img src="./screenshots/all-services.png" alt="Services List" width="45%">
<img src="./screenshots/provider-services.png" alt="Service Details" width="45%">

### 📅 Appointments
<img src="./screenshots/appointments-provider.png" alt="Customer Appointments" width="45%">
<img src="./screenshots/appointments-customer.png" alt="Provider Services" width="45%">
<img src="./screenshots/booking.png" alt="Provider Services" width="45%">
<img src="./screenshots/settings.png" alt="Provider Services" width="45%">

### 📱 Mobile Responsive
<img src="./screenshots/mobile-1.png" alt="Mobile Services" width="30%">
<img src="./screenshots/mobile-2.png" alt="Mobile Dashboard" width="30%">

</div>

---

## ✨ Features

### 🔐 **Authentication & Authorization**
- Secure user registration and login with JWT
- Role-based access control (Customer & Service Provider)
- Protected routes and API endpoints
- Persistent sessions with HTTP-only cookies

### 💼 **For Service Providers**
- Complete service management (Create, Read, Update, Delete)
- Dashboard with real-time statistics
- Appointment management with status updates
- Revenue tracking and analytics

### 👥 **For Customers**
- Browse available services with search and filters
- Easy appointment booking with date/time selection
- View and manage personal appointments
- Multi-language interface support

### 🌍 **Multi-Language Support**
- 🇬🇧 English
- 🇸🇦 Arabic (with full RTL support)
- 🇫🇷 French

### 📱 **Responsive Design**
- Fully responsive across all devices
- Mobile-first approach
- Touch-friendly interface
- Optimized for tablets and desktops

### 🎨 **Modern UI/UX**
- Clean and professional design
- Smooth animations and transitions
- Intuitive navigation
- Accessibility-focused

---

## 🛠️ Tech Stack

### **Frontend**
| Technology | Purpose |
|-----------|---------|
| ⚛️ React 19 | UI Framework |
| ⚡ Vite | Build Tool |
| 🎨 Tailwind CSS v4 | Styling |
| 🧭 React Router v6 | Navigation |
| 🌐 i18next | Internationalization |
| 📡 Axios | HTTP Client |
| 📅 date-fns | Date Formatting |
| 🔔 React Hot Toast | Notifications |
| 🎯 Lucide React | Icons |

### **Backend**
| Technology | Purpose |
|-----------|---------|
| 🟢 Node.js | Runtime Environment |
| 🚂 Express.js | Web Framework |
| 🍃 MongoDB | Database |
| 🔐 JWT | Authentication |
| 🔒 bcryptjs | Password Hashing |
| ✅ Mongoose | ODM |

---

## 🚀 Getting Started

### **Prerequisites**

- Node.js 18+ and npm
- MongoDB 6.0+
- Git

### **Installation**

#### **1. Clone the Repository**
```bash
git clone https://github.com/Abdallahi-Nah/booking-system.git
cd booking-system
```

#### **2. Backend Setup**
```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOL
PORT=5000
MONGO_URI=mongodb://localhost:27017/booking-system
# OR use MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/booking-system
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRE=30d
NODE_ENV=development
EOL

# Start the server
npm run dev
```

The backend will run on `http://localhost:5000`

#### **3. Frontend Setup**
```bash
# Navigate to frontend (from root)
cd ../frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000/api" > .env

# Start development server
npm run dev
```

The frontend will run on `http://localhost:5173`

---

## 📂 Project Structure
```
booking-system/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js   # Authentication logic
│   │   ├── serviceController.js
│   │   └── appointmentController.js
│   ├── middleware/
│   │   └── auth.js            # JWT verification
│   ├── models/
│   │   ├── User.js            # User schema
│   │   ├── Service.js         # Service schema
│   │   └── Appointment.js     # Appointment schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── serviceRoutes.js
│   │   └── appointmentRoutes.js
│   ├── .env
│   ├── server.js              # Entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── AppointmentCard.jsx
    │   │   ├── LanguageSwitcher.jsx
    │   │   ├── LoadingSpinner.jsx
    │   │   ├── MainLayout.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   ├── ServiceCard.jsx
    │   │   ├── ServiceFormModal.jsx
    │   │   └── StatsCard.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx    # Auth state management
    │   ├── i18n/
    │   │   ├── i18n.js
    │   │   └── locales/
    │   │       ├── en.json
    │   │       ├── ar.json
    │   │       └── fr.json
    │   ├── pages/
    │   │   ├── Appointments.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Login.jsx
    │   │   ├── MyServices.jsx
    │   │   ├── NotFound.jsx
    │   │   ├── Register.jsx
    │   │   ├── ServiceDetails.jsx
    │   │   ├── Services.jsx
    │   │   └── Settings.jsx
    │   ├── services/
    │   │   ├── api.js             # Axios instance
    │   │   ├── appointmentService.js
    │   │   └── serviceService.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── .env
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.js
```

---

## 🔌 API Endpoints

### **Authentication**
```
POST   /api/auth/register    # Register new user
POST   /api/auth/login       # Login user
GET    /api/auth/me          # Get current user (Protected)
```

### **Services**
```
GET    /api/services              # Get all services
POST   /api/services              # Create service (Provider only)
GET    /api/services/:id          # Get service by ID
GET    /api/services/provider/:id # Get provider's services
PUT    /api/services/:id          # Update service (Provider only)
DELETE /api/services/:id          # Delete service (Provider only)
```

### **Appointments**
```
GET    /api/appointments           # Get user's appointments
POST   /api/appointments           # Create appointment
PUT    /api/appointments/:id/status # Update appointment status
DELETE /api/appointments/:id       # Delete appointment
```

---

## 🎨 Design System

### **Color Palette**
```css
Primary:   #3B82F6  /* Blue */
Secondary: #8B5CF6  /* Purple */
Success:   #10B981  /* Green */
Warning:   #F59E0B  /* Orange */
Danger:    #EF4444  /* Red */
```

### **Responsive Breakpoints**
```css
Mobile:  < 768px
Tablet:  768px - 1024px
Desktop: > 1024px
```

---

## 🌍 Internationalization (i18n)

The application supports three languages with automatic direction switching:

- **English (en)** - LTR
- **Arabic (ar)** - RTL with full right-to-left support
- **French (fr)** - LTR

Language preference is stored in `localStorage` and persists across sessions.

---

## 🔐 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ HTTP-only cookies for token storage
- ✅ Protected API routes
- ✅ Input validation
- ✅ CORS configuration
- ✅ Environment variables for sensitive data

---

## 📱 PWA Ready

The application can be converted to a Progressive Web App with:
- Offline support
- Push notifications
- Install to home screen
- Service worker caching

---

## 🚀 Deployment

### **Backend (Render.com)**

1. Create account on [Render](https://render.com)
2. Create new Web Service
3. Connect your GitHub repository
4. Set environment variables:
```
   MONGO_URI=your-mongodb-atlas-uri
   JWT_SECRET=your-secret-key
   PORT=5000
   NODE_ENV=production
```
5. Deploy!

### **Frontend (Vercel)**

1. Create account on [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Set environment variable:
```
   VITE_API_URL=https://your-backend-url.onrender.com/api
```
4. Deploy!

---

## 📊 Database Schema

### **User Model**
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  role: Enum ['customer', 'provider'],
  avatar: String,
  timestamps: true
}
```

### **Service Model**
```javascript
{
  title: String,
  description: String,
  price: Number,
  duration: Number (minutes),
  isActive: Boolean,
  image: String,
  providerId: ObjectId (ref: User),
  timestamps: true
}
```

### **Appointment Model**
```javascript
{
  date: Date,
  time: String,
  endTime: String,
  status: Enum ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
  note: String,
  customerId: ObjectId (ref: User),
  providerId: ObjectId (ref: User),
  serviceId: ObjectId (ref: Service),
  timestamps: true
}
```

---

## 🧪 Testing
```bash
# Backend tests (if implemented)
cd backend
npm test

# Frontend tests (if implemented)
cd frontend
npm test
```

---

## 📝 Future Enhancements

- [ ] Email notifications for appointments
- [ ] SMS reminders
- [ ] Payment integration (Stripe, PayPal)
- [ ] Calendar sync (Google Calendar)
- [ ] Review and rating system
- [ ] Advanced analytics dashboard
- [ ] Admin panel
- [ ] Real-time chat support
- [ ] Mobile apps (React Native)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Abdallahi Nah**

- 💼 LinkedIn: [linkedin.com/in/abdallahi-nah](linkedin.com/in/abdallahi-nah)
- 🐙 GitHub: [@Abdallahi-Nah](https://github.com/Abdallahi-Nah)
- 📧 Email: abdallahi.nah.un.fst@gmail.com

---

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev)
- Design inspiration from modern SaaS applications
- Built with ❤️ using the MERN stack

---

<div align="center">

### ⭐ Star this repository if you found it helpful!

Made with 💙 by Abdallahi Nah

</div>
