// Filename - signin.js
import React from 'react';
import Navbar from '../components/Navbar';
import { GoogleOAuthProvider } from '@react-oauth/google';
import env from 'react-dotenv';
import LoginButton from '../components/Login';

function Signin() {

  return (
    <GoogleOAuthProvider clientId={env.OAUTH_CLIENT_ID}>
      <Navbar></Navbar>
      <LoginButton />
    </GoogleOAuthProvider>
  );
}

export default Signin;
