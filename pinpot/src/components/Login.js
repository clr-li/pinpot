// Filename - Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function LoginForm() {
    const history = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function submitLogin(e) {
        e.preventDefault();

        try {
            await axios
                .post('http://localhost:8000/', {
                    email,
                    password,
                })
                .then(res => {
                    if (res.data == 'exist') {
                        history('/', { state: { id: email } });
                    } else if (res.data == 'notexist') {
                        alert("Username doesn't exist");
                    }
                })
                .catch(e => {
                    alert('wrong details');
                    console.log(e);
                });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="login">
            <h1>Login</h1>

            <form action="POST">
                <input
                    type="email"
                    onChange={e => {
                        setEmail(e.target.value);
                    }}
                    placeholder="Email"
                />
                <input
                    type="password"
                    onChange={e => {
                        setPassword(e.target.value);
                    }}
                    placeholder="Password"
                />
                <input type="submit" onClick={submitLogin} />
            </form>

            <br />
            <p>OR</p>
            <br />

            <Link to="/signup.html">Signup Page</Link>
        </div>
    );
}

export default LoginForm;
