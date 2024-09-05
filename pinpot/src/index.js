import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import env from 'react-dotenv';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={env.OAUTH_CLIENT_ID}>
    <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
); 
