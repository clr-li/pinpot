// Filename: home.js
import React, { useState, useEffect } from 'react';
import '../index.css';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBox from '../components/SearchBox';
import Maps from '../components/Maps';
import TopPosts from '../components/TopPosts';
import axios from 'axios';

function HomePage() {
    const [locations, setLocations] = useState([]);
    const [selectPosition, setSelectPosition] = useState(null);

    useEffect(() => {
        async function fetchTopPosts() {
            try {
                const res = await axios.get('http://localhost:8000/top-posts');

                if (res.status === 200) {
                    let extractedLocations = res.data.data.map(post => post.location);
                    extractedLocations = Array.from(
                        new Set(extractedLocations.map(loc => JSON.stringify(loc))),
                    ).map(loc => JSON.parse(loc));
                    setLocations(extractedLocations);
                } else {
                    console.log('Failed to fetch top posts', res.status);
                }
            } catch (error) {
                console.log('Error fetching top posts:', error);
            }
        }

        fetchTopPosts();
    }, []);

    const handleMarkerClick = location => {
        setSelectPosition(location);
    };

    return (
        <React.StrictMode>
            <Navbar />
            <div className="half-half-containter">
                <div style={{ width: '50vw', height: '100%' }}>
                    <Maps
                        selectPosition={selectPosition}
                        locations={locations}
                        onMarkerClick={handleMarkerClick}
                    />
                </div>
                <div style={{ width: '50vw' }}>
                    <h1>PinPot Top Posts</h1>
                    <SearchBox
                        selectPosition={selectPosition}
                        setSelectPosition={setSelectPosition}
                    />
                    <TopPosts selectPosition={selectPosition} />
                </div>
            </div>
        </React.StrictMode>
    );
}

export default HomePage;
