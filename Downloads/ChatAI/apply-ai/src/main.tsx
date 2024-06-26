// main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { initializeOpenAIClient } from './api/openaiClient';  // Adjust the path as necessary

// Call the function to initialize OpenAI Client
initializeOpenAIClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
