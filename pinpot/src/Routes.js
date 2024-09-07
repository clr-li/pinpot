import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import Map from './pages/map';

export const Routers = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/map.html" element={<Map />} />
                <Route path="/signup.html" element={<Signup />} />
                <Route path="/login.html" element={<Login />} />
            </Routes>
        </Router>
    );
};
