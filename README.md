# 🍽️ FeastForward — Premium Multi-Lingual Dining & Table Reservations

**FeastForward** is a modern, full-stack luxury restaurant management and dining web application built with **React, Redux, Material-UI, and React Query**.

The platform streamlines the complete dining experience by allowing customers to **reserve tables, pre-order gourmet meals, manage bookings, and explore a multilingual menu experience**. Alongside the customer-facing experience, FeastForward provides a powerful **administrative suite** for real-time reservation management, menu control, order tracking, and business analytics.

---

## ✨ Key Features

### 👤 Customer Experience

* **🍽️ Instant Table Reservation & Meal Pre-Ordering**
  Reserve tables with customizable party sizes, dates, and times while pre-ordering signature dishes before arrival to minimize waiting time.

* **🌍 Multi-Lingual Support (i18n)**
  Full internationalization support across **6 languages**:

  * 🇬🇧 English
  * 🇪🇸 Spanish
  * 🇮🇳 Hindi
  * 🇮🇳 Gujarati
  * 🇮🇳 Punjabi
  * 🇫🇷 French

* **🔎 Dynamic Search & Category Filtering**
  Easily explore and filter gourmet menu items based on categories, dietary preferences, and popularity.

* **📖 Personalized Reservation Management**
  A dedicated **My Bookings** page allows customers to view, track, and cancel upcoming reservations and orders.

* **📱 Responsive Luxury UI**
  Fully responsive interface powered by **Material-UI**, with dark/light mode context awareness for a comfortable experience across devices.

* **🔍 SEO & Dynamic Metadata**
  Dynamic document titles and metadata are managed on a per-page basis using `react-helmet-async`.

---

### 🛡️ Admin Suite

* **📊 Real-Time Analytics Dashboard**
  Comprehensive overview of revenue trends, booking metrics, and dish popularity.

* **🍴 Interactive Menu Manager**
  Add, edit, remove, or dynamically toggle menu item availability and chef-featured tags.

* **📋 Reservation Control Center**
  Manage incoming reservations and pre-orders through a live dashboard with options to approve reservations, update statuses, and assign tables.

* **🔐 Role-Based Access Control**
  Protected customer and administrator routes with seamless navigation and access control.

---

## 🛠️ Tech Stack

| Category                  | Technology                                           |
| ------------------------- | ---------------------------------------------------- |
| **Frontend**              | React 18, Vite                                       |
| **State Management**      | Redux Toolkit, TanStack React Query                  |
| **UI & Styling**          | Material-UI (MUI v5), `@mui/icons-material`, Emotion |
| **Routing**               | React Router DOM v6 (`createBrowserRouter`)          |
| **Internationalization**  | `i18next`, `react-i18next`                           |
| **Head Management & SEO** | `react-helmet-async`                                 |
| **Mock Backend / API**    | JSON Server or Custom REST API                       |

### State Management

* **Redux Toolkit** — Theme and global application state
* **TanStack React Query** — Server-state management and API data handling

---

## 📁 Project Structure

```text
src/
├── assets/                 # Static media and images
├── components/             # Reusable UI components
│   ├── common/             # Generic components (e.g., PageSEO.jsx)
│   ├── home/               # Modularized Home page sections
│   ├── navbar/             # Navigation and redirect handlers
|   ├── admin/              # Admin Components
├── config/                 # Theme, MUI configurations, and i18n setup
├── constants/              # Global constants and static data
├── layouts/                # Route layout wrappers
│   ├── CustomerLayout
│   └── AdminLayout
├── pages/                  # Page components
│   ├── Home.jsx
│   ├── Menu.jsx
│   ├── ReservationPage.jsx
│   ├── MyBookingsPage.jsx
│   ├── Bookings.jsx
│   ├── admin
|       ├── AdminDashboard.jsx
│       ├── AdminAnalyticsTab.jsx
│       ├── AdminMenuTab.jsx
│       └── AdminReservationTab.jsx
├── store/                  # Redux slices and store configuration
├── utils/                  # Currency formatting, helpers, and utility functions
├── App.jsx                 # Global providers, router engine, and base Helmet setup
└── main.jsx                # Application entry point
```

---

## 🚀 Setup & Installation

Follow the steps below to run **FeastForward** locally.

### 📋 Prerequisites

Make sure the following are installed on your system:

* **Node.js** — v16.0.0 or higher
* **npm** or **yarn**

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Kuldip-1101/FeastForward_React.git
cd feastforward
```

---

### 2️⃣ Install Dependencies

Using npm:

```bash
npm install
```

---

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory and add your API base URL:

```env
VITE_API_BASE_URL=http://localhost:5000
```

> Make sure the API URL matches the port on which your backend or JSON Server is running.

---

### 4️⃣ Start the Mock Backend

If you are using **JSON Server** as the mock backend, run:

```bash
npx json-server --watch db.json --port 5000
```

The API will then be available at:

```text
http://localhost:5000
```

---

### 5️⃣ Start the Development Server

Run the React development server:

```bash
npm run dev
```

Once the server starts, open:

**http://localhost:5173**

in your browser.

---

## 🌍 Internationalization

FeastForward includes complete multilingual support using:

* `i18next`
* `react-i18next`

The application currently supports:

| Language     | Language      |
| ------------ | ------------- |
| 🇬🇧 English | 🇪🇸 Spanish  |
| 🇮🇳 Hindi   | 🇮🇳 Gujarati |
| 🇮🇳 Punjabi | 🇫🇷 French   |

This allows customers to navigate and interact with the dining experience in their preferred language.

---

## 🔮 Future Enhancements

The following enhancements are planned for future versions of FeastForward:

### 💳 Payment Gateway Integration

Integrate payment providers such as **Stripe** or **Razorpay** to support online pre-order deposits.

### 🪑 Interactive Table Layout

Introduce a visual drag-and-drop floor plan that allows floor managers to assign restaurant tables interactively.

### 📲 Push & SMS Notifications

Add automated reservation reminders using services such as **Twilio** or the **WhatsApp Business API**.

### 🥗 Advanced Dietary Tag Filters

Expand menu filtering capabilities with advanced dietary options such as:

* Vegan
* Gluten-Free
* Halal
* Nut-Free
* Keto

### ⭐ Customer Reviews & Ratings

Introduce a post-dining review system allowing customers to submit reviews and ratings for pre-ordered menu items.

---

## 📌 Project Highlights

FeastForward brings together:

* 🍽️ Restaurant reservations
* 🥘 Gourmet meal pre-ordering
* 🌍 Six-language internationalization
* 📊 Administrative analytics
* 📋 Reservation management
* 🍴 Dynamic menu management
* 🔐 Role-based route protection
* 📱 Responsive Material-UI design
* 🔍 SEO-friendly dynamic metadata
* ⚡ Modern React architecture
* 🔄 Server-state management with React Query

---

## ✍️ Author

**Developer:** Kuldip Patel

**GitHub:** (https://github.com/Kuldip-1101)

