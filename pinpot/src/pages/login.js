// Filename - login.js
import React from 'react';
import Navbar from '../components/Navbar';
import LoginForm from '../components/Login';

function Login() {
    return (
        <React.StrictMode>
            <Navbar></Navbar>
            <LoginForm />
        </React.StrictMode>
    );
}

export default Login;
