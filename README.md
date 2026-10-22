# Library Management System — Frontend

A web-based Library Management System built with **React.js, Vite, and Material UI (MUI)**. The application provides dedicated interfaces for administrators and members to manage books, members, borrowings, fines, and authentication. It communicates with a Node.js and Express REST API backend.

## 🔗 Backend Repository

This frontend communicates with a Node.js and Express REST API backend.

**Backend Repository:** [Library Management System — Node.js & Express Backend](https://github.com/sajid13673/library_management_system-react-express)

## 🚀 System Modules & Core Features

### 🔐 Multi-Role Authentication

* **Role-Based Access Control (RBAC):** Enforces role-based access restrictions between **Admins** and **Users (Members)** to protect system resources.
* **Password Security:** Uses **Bcrypt.js** on the backend for password hashing.
* **JWT Authentication:** Uses JSON Web Tokens (JWT) for authentication and authorization.
* **Cookie-Based Authentication:** Supports cookie-based token handling for authenticated requests.
* **Account Activation:** Blocks login attempts with a `403 Forbidden` response when an account is inactive or awaiting administrator approval.

### 🖥️ Role-Based User Interfaces

* **Separate Dashboards:** Provides dedicated interfaces for administrators and members, with role-specific features and navigation.
* **Admin Dashboard:** Offers centralized access to member management, book inventory, borrowing records, fine management, and account activation controls.
* **Member Dashboard:** Allows members to browse books, view borrowing history, track current loans and due dates, and check outstanding fines.
* **Protected Routes:** Restricts access to role-specific pages and prevents unauthorized users from accessing administrative features.
* **Dynamic UI Rendering:** Displays navigation menus, actions, and components according to the authenticated user's role.

### 👥 Member Management

* **Admin Member Provisioning:** Allows administrators to register new members without manually creating passwords. The backend uses Node.js's native `crypto` module to generate secure temporary passwords.
* **Automated Email Notifications:** Integrates **Nodemailer** to send transactional emails using dedicated templates, including `activationPending.js`, `accountActivated.js`, and `accountCreatedByAdmin.js`.
* **Account Activation:** Supports member activation and deactivation, with notifications when account status changes.

### 📖 Book Management

* **Catalog Control:** Provides CRUD operations for administrators to manage book titles, authors, categories, and stock quantities.
* **Book Cover Uploads:** Supports book cover uploads handled by the backend using **Multer**.

### 🔄 Borrowings Management

* **Circulation Tracking:** Manages the borrowing lifecycle, including book checkouts, scheduled return dates, returns, and available stock counts.
* **Availability Validation:** Prevents borrowing when book stock reaches zero or a member exceeds the permitted borrowing limit.
* **Borrowing History:** Tracks borrowing records so administrators and members can monitor current and previous loans.

### 💰 Fine Management & Automation

* **Automated Fine Calculation:** Uses **Node-Cron** on the backend to schedule tasks that identify overdue borrowings and calculate applicable fines.
* **Fine Tracking:** Maintains fine records associated with overdue books and outstanding payments.
* **Borrowing Restrictions:** Restricts borrowing privileges for members with unresolved fines.
* **Fine Resolution:** Enables administrators to manage outstanding fines and update their status.

## 🛠️ Tech Stack

* **React.js** — Frontend library
* **Vite** — Development server and build tool
* **JavaScript** — Application logic
* **Material UI (MUI)** — UI components and styling
* **React Router** — Client-side routing
* **Axios** — HTTP requests to the backend API
* **Formik** — Form management and validation
* **Day.js / Moment.js** — Date handling

## 📋 Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/)
* npm (included with Node.js)
* The Library Management System backend API

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <YOUR_FRONTEND_REPOSITORY_URL>
cd <YOUR_FRONTEND_REPOSITORY_DIRECTORY>
```

Replace the placeholders with your actual frontend repository URL and directory name.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root and configure the backend URLs:

```env
VITE_APP_API_BASE_URL=http://localhost:5000
VITE_APP_API_BASE_API_URL=http://localhost:5000/api
```

| Variable                    | Description                                 |
| --------------------------- | ------------------------------------------- |
| `VITE_APP_API_BASE_URL`     | Base URL of the backend server.             |
| `VITE_APP_API_BASE_API_URL` | Base URL of the backend REST API endpoints. |

Access these variables in your React application using `import.meta.env`:

```javascript
const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_API_URL;
```

**Note:** Replace the local URLs with the appropriate backend URLs when deploying to production. Vite exposes variables prefixed with `VITE_` to client-side code, so do not store secrets or private credentials in them.


### 4. Start the development server

```bash
npm run dev
```

Vite will display the local development URL in your terminal, typically:

```text
http://localhost:5173
```

### 5. Build for production

```bash
npm run build
```

The production-ready files will be generated in the `dist` directory.

### 6. Preview the production build

```bash
npm run preview
```

This starts a local server to preview the production build.

## 📜 Available Scripts

| Command           | Description                               |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Starts the Vite development server        |
| `npm run build`   | Builds the application for production     |
| `npm run preview` | Previews the production build             |
| `npm run lint`    | Runs ESLint, if configured in the project |

## 📁 Project Structure

The project follows a component-based React architecture. The exact structure may vary depending on the implementation.

```text
src/
├── assets/         # Images and other static assets
├── components/     # Reusable UI components
├── pages/          # Application pages
├── services/       # API services and HTTP configuration
├── hooks/          # Custom React hooks
├── context/        # Authentication and shared state
├── utils/          # Utility functions and helpers
├── App.jsx         # Main application component
└── main.jsx        # Application entry point
```

## 🔌 Backend Integration

The frontend communicates with the Node.js and Express backend through REST API endpoints using Axios.

Before running the application, ensure that:

* The backend server is running and accessible.
* `VITE_API_BASE_URL` points to the correct backend API URL.
* The backend CORS configuration allows requests from the frontend origin.
* Cookie-based authentication is configured correctly on both the frontend and backend when required.

## 📦 Deployment

The application can be deployed to platforms such as **Vercel**, **Netlify**, or another static hosting provider that supports Vite applications.

For production deployment:

1. Configure the production API URL using `VITE_API_BASE_URL`.
2. Run `npm run build`.
3. Deploy the generated `dist` directory.
4. Configure the hosting provider to serve `index.html` for client-side routes when using React Router.
5. Ensure the backend CORS and cookie settings support the deployed frontend domain.

---

Developed as a full-stack Library Management System project using React.js, Vite, Material UI, Node.js, and Express.
