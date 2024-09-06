import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';

export const Routers = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup.html" element={<Signup />} />
                <Route path="/login.html" element={<Login />} />
            </Routes>
        </Router>
    )
}