// Filename - home.js
import React, { useState } from 'react';
import '../index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import env from 'react-dotenv';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBox from '../components/SearchBox';
import Maps from '../components/Maps';
import { useLocation } from 'react-router-dom';

function Home() {
    const location = useLocation();
    const [selectPosition, setSelectPosition] = useState(null);
    return (
        <GoogleOAuthProvider clientId={env.OAUTH_CLIENT_ID}>
            <Navbar></Navbar>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100vw',
                    height: '100vh',
                }}
            >
                <div style={{ width: '50vw', height: '100%' }}>
                    <Maps selectPosition={selectPosition} />
                </div>
                <div style={{ width: '50vw' }}>
                    <SearchBox
                        selectPosition={selectPosition}
                        setSelectPosition={setSelectPosition}
                    />
                </div>
            </div>
        </GoogleOAuthProvider>
    );
}

export default Home;
