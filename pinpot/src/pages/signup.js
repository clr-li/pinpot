// Filename - signup.js
import React from 'react';
import Navbar from '../components/Navbar';
import { GoogleOAuthProvider } from '@react-oauth/google';
import env from 'react-dotenv';
import SignupForm from '../components/Signup';

function Signup() {

  return (
    <GoogleOAuthProvider clientId={env.OAUTH_CLIENT_ID}>
      <Navbar></Navbar>
      <SignupForm />
    </GoogleOAuthProvider>
  );
}

export default Signup;
