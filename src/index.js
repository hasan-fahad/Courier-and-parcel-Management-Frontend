import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRoutes from './App'; // renamed App to AppRoutes
import { AuthProvider } from "./context/AuthContext";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
