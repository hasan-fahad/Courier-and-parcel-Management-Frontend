
# Courier and Parcel Management Frontend

## Overview

This is the **React.js** frontend for the Courier and Parcel Management System.  
It provides an intuitive UI for Admins, Customers, and Delivery Agents to manage and track parcels.

The frontend communicates with the backend APIs hosted separately for all business logic and database operations.

---

### Backend-repo: https://github.com/hasan-fahad/Courier-and-parcel-Management-Backend

## Features

- **Admin**  
  - Manage users and agents  
  - Assign and update parcel statuses  
  - View parcel tracking and reports  

- **Customer**  
  - Create new parcel delivery requests  
  - Track parcels in real-time  

- **Agent**  
  - View assigned parcels  
  - Update parcel delivery status and locations  

---

## Login Credentials for Demo

| Role     | Email              | Password     |
| -------- | ------------------ | ------------|
| Admin    | admin@test.com     | Password123 |
| Customer | customer@test.com  | Password123 |
| Agent    | agent@test.com     | Password123 |

---

## Getting Started

### Prerequisites

- Node.js (v14 or higher)  
- npm (v6 or higher)  

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/hasan-fahad/Courier-and-parcel-Management-Frontend.git
   cd Courier-and-parcel-Management-Frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` file in the root directory and add your backend API URL:

   ```env
   REACT_APP_API_BASE_URL=http://localhost:5000/api
   ```

4. Run the development server:

   ```bash
   npm start
   ```

5. Open your browser and go to:

   ```
   http://localhost:3000
   ```

---

## Project Structure

```
src/
├── api/               # Axios instance and API utilities
├── components/        # Reusable UI components
├── pages/             # Page-level components for Admin, Customer, Agent dashboards
├── routes/            # React Router routes
├── utils/             # Helper functions
└── App.js             # Main app component
```

---

## Technologies Used

- React.js  
- Tailwind CSS  
- Axios  
- React Router Dom  

---

