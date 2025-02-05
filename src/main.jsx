import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initializeIcons } from '@fluentui/react';
import '@fluentui/react/dist/css/fabric.css';
import App from './App.jsx'
import './styles/index.css'; 

initializeIcons();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
