// Filename - map.js
import React, { useState, useEffect } from 'react';
import '../index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import env from 'react-dotenv';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBox from '../components/SearchBox';
import Maps from '../components/Maps';
import { fetchProtectedData } from '../auth';
import { useNavigate } from 'react-router-dom';

let permitted = true;
try {
    let response = await fetchProtectedData();
    console.log(response);
} catch (error) {
    permitted = false;
}

function Map() {
    const history = useNavigate();

    useEffect(() => {
        if (!permitted) {
            history('/login.html');
        }
    });
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

export default Map;
