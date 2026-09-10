// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

const container = document.getElementById('root');

// Prevent duplicate root creation during development / HMR
if (!container._reactRootContainer) {
  container._reactRootContainer = ReactDOM.createRoot(container);
}

container._reactRootContainer.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);