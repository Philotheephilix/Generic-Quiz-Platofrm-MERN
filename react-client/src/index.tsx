// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';  // Updated import for createRoot
import './styles/index.css';              // Import Tailwind CSS
import App from './App';
import { UserProvider } from './context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
