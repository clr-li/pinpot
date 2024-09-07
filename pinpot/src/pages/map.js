// Filename - map.js
import React, { useState, useEffect } from 'react';
import '../index.css';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBox from '../components/SearchBox';
import Maps from '../components/Maps';
import { fetchProtectedData } from '../auth';
import { useNavigate } from 'react-router-dom';
import UserProfile from '../components/UserData';
import Posts from '../components/Posts';

let permitted = true; // TODO: Turn this into a component
try {
    await fetchProtectedData();
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
        <React.StrictMode>
            <Navbar></Navbar>
            <div className="half-half-containter">
                <div style={{ width: '50vw' }}>
                    <Maps selectPosition={selectPosition} />
                </div>
                <div style={{ width: '50vw' }}>
                    <UserProfile></UserProfile>
                    <SearchBox
                        selectPosition={selectPosition}
                        setSelectPosition={setSelectPosition}
                    />
                    <Posts></Posts>
                </div>
            </div>
        </React.StrictMode>
    );
}

export default Map;
