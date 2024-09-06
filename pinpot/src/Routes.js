import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Signin from './pages/signin'

export const Routers = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin.html" element={<Signin />} />
            </Routes>
        </Router>
    )
}