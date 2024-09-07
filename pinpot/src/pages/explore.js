// Filename - explore.js
import React from 'react';
import Navbar from '../components/Navbar';
import Explore from '../components/Explore';

function ExplorePage() {
    return (
        <React.StrictMode>
            <Navbar></Navbar>
            <Explore />
        </React.StrictMode>
    );
}

export default ExplorePage;
