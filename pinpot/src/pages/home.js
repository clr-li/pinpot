// Filename - home.js
import React, { useState } from 'react';
import '../index.css';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBox from '../components/SearchBox';
import Maps from '../components/Maps';

function Home() {
    const [selectPosition, setSelectPosition] = useState(null);
    return (
        <React.StrictMode>
            <Navbar></Navbar>
            <div className="half-half-containter">
                <div className="half-half-containter">
                    <Maps selectPosition={selectPosition} />
                </div>
                <div className="half-half-containter">
                    <SearchBox
                        selectPosition={selectPosition}
                        setSelectPosition={setSelectPosition}
                    />
                </div>
            </div>
        </React.StrictMode>
    );
}

export default Home;
