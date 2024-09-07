// Filename - Login.js
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';

function LoginForm() {
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [username, pwd]);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await axios
                .post('http://localhost:8000/login', {
                    username: username,
                    password: pwd,
                })
                .then(res => {
                    if (res.status === 201) {
                        localStorage.setItem('token', res.data.token);
                        setUser('');
                        setPwd('');
                        setSuccess(true);
                    } else {
                        setErrMsg(res.data);
                    }
                })
                .catch(e => {
                    setErrMsg('Unable to login');
                    setUser('');
                    setPwd('');
                });
        } catch (e) {
            setErrMsg(e.response.data);
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="/">Go to Home</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p
                        ref={errRef}
                        className={errMsg ? 'errmsg' : 'offscreen'}
                        aria-live="assertive"
                    >
                        {errMsg}
                    </p>
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={e => setUser(e.target.value)}
                            value={username}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={e => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Sign In</button>
                    </form>
                    <p>
                        Need an Account?
                        <br />
                        <span className="line">
                            <a href="/signup.html">Sign Up Page</a>
                        </span>
                    </p>
                </section>
            )}
        </>
    );
}

export default LoginForm;
