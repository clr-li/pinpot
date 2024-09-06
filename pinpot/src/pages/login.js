// Filename - login.js
import React from 'react';
import Navbar from '../components/Navbar';
import { GoogleOAuthProvider } from '@react-oauth/google';
import env from 'react-dotenv';
import LoginForm from '../components/Login';

function Login() {

  return (
    <GoogleOAuthProvider clientId={env.OAUTH_CLIENT_ID}>
      <Navbar></Navbar>
      <LoginForm />
    </GoogleOAuthProvider>
  );
}

export default Login;
