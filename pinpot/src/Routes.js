import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import MapPage from './pages/map';
import Upload from './pages/post';
import SearchPage from './pages/search';

export const Routers = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/map.html" element={<MapPage />} />
                <Route path="/signup.html" element={<SignupPage />} />
                <Route path="/post.html" element={<Upload />} />
                <Route path="/login.html" element={<LoginPage />} />
                <Route path="/search.html" element={<SearchPage />} />
            </Routes>
        </Router>
    );
};
