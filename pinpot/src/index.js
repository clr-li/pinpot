import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import env from 'react-dotenv';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={env.OAUTH_CLIENT_ID}>
      <Navbar></Navbar>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
); 
