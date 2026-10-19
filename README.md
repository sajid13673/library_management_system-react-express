# Library Management System — Frontend

A web-based Library Management System built with React.js and Material UI. The application provides an interface for managing library members, books, borrowings, and user authentication, communicating with a Node.js and Express REST API backend.

## 🔗 Backend Repository

This frontend communicates with a Node.js and Express REST API backend.

**Backend Repository:** [Library Management System Node Js — Backend](https://github.com/sajid13673/library_management_system-react-express.git)

## 🚀 System Modules & Core Features

### 🔐 Multi-Role Authentication

- **Role-Based Access Control (RBAC):** Enforces role-based access restrictions between **Admins** and **Users (Members)** to protect system resources.
- **Security Layer:** Uses **Bcrypt.js** for password hashing and **JSON Web Tokens (JWT)** for authentication.
- **Cookie-Based Authentication:** Supports secure cookie-based token handling for authenticated requests.
- **Activation Gatekeeper:** Blocks login attempts with a `403 Forbidden` response when an account is inactive or awaiting administrator approval.

### 🖥️ Role-Based User Interfaces

- **Separate Dashboards:** Provides dedicated interfaces for administrators and members, with role-specific features and navigation.
- **Admin Dashboard:** Offers centralized access to member management, book inventory, borrowing records, fine management, and account activation controls.
- **Member Dashboard:** Allows members to browse books, view borrowing history, track current loans and due dates, and check outstanding fines.
- **Protected Routes:** Restricts access to role-specific pages and prevents unauthorized users from accessing administrative features.
- **Dynamic UI Rendering:** Displays navigation menus, actions, and components according to the authenticated user's role.

### 👥 Member Management

- **Admin Member Provisioning:** Allows administrators to register new members without manually creating passwords. Uses Node.js's native `crypto` module to generate secure temporary passwords.
- **Automated Email Notifications:** Integrates **Nodemailer** to send transactional emails using dedicated templates, including `activationPending.js`, `accountActivated.js`, and `accountCreatedByAdmin.js`.
- **Account Activation:** Supports member activation and deactivation, with automated notifications when account status changes.

### 📖 Book Management

- **Catalog Control:** Provides full CRUD operations for administrators to manage book titles, authors, categories, and stock quantities.
- **Book Cover Uploads:** Uses **Multer** to handle book cover uploads and manage uploaded files in static directories.

### 🔄 Borrowings Management

- **Circulation Tracking:** Manages the borrowing lifecycle, including book checkouts, scheduled return dates, returns, and available stock counts.
- **Availability Validation:** Prevents borrowing when book stock reaches zero or a member exceeds the permitted borrowing limit.
- **Borrowing History:** Tracks borrowing records to help administrators and members monitor current and previous loans.

### 💰 Fine Management & Automation

- **Automated Fine Calculation:** Uses **Node-Cron** to schedule background tasks that identify overdue borrowings and calculate applicable fines.
- **Fine Tracking:** Maintains fine records associated with overdue books and outstanding payments.
- **Borrowing Restrictions:** Restricts borrowing privileges for members with unresolved fines until the required administrative resolution is completed.
- **Fine Resolution:** Enables administrators to manage outstanding fines and update their status.

## Tech Stack

- **React.js** — Frontend library
- **JavaScript** — Application logic
- **Material UI (MUI)** — UI components and styling
- **React Router** — Client-side routing
- **Axios** — HTTP requests to the backend API
- **Formik** — Form management and validation
- **Day.js / Moment.js** — Date handling

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm (included with Node.js)
- The Library Management System backend API

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/sajid13673/library_management_system-react-express.git