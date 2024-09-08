// Filename - explore.js
import React, { useState, useEffect } from 'react';
import '../index.css';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Maps from '../components/Maps';
import { useNavigate } from 'react-router-dom';
import UserProfile from '../components/UserData';
import { getUserFromToken } from '../auth';
import axios from 'axios';
import SearchBox from '../components/SearchBox';
import { useLocation } from 'react-router-dom';

function ExplorePage() {
    const [locations, setLocations] = useState([]);
    const [selectPosition, setSelectPosition] = useState(null);
    const history = useNavigate();
    const location = useLocation();
    const [visibilityFilter, setVisibilityFilter] = useState({
        // TODO: use enum
        public: true,
        private: false,
        friendsOnly: false,
    });

    useEffect(() => {
        let userInfo = null;
        try {
            userInfo = getUserFromToken();
        } catch (error) {
            history('/login.html');
        }

        async function fetchData() {
            try {
                const params = new URLSearchParams(location.search);
                const username = params.get('username');
                let res = null;

                const visibilityArray = Object.keys(visibilityFilter).filter(
                    key => visibilityFilter[key],
                );

                if (username) {
                    res = await axios.get('http://localhost:8000/get-posts-by-visibility-loc', {
                        params: { username, visibility: visibilityArray },
                    });
                } else {
                    // Fetch locations and posts of people the user follows
                    res = await axios.get('http://localhost:8000/get-followed-posts-loc', {
                        params: { uid: userInfo.id },
                    });
                }

                if (res.status === 200) {
                    let extractedLocations = res.data.data.map(post => post.location);
                    extractedLocations = Array.from(
                        new Set(extractedLocations.map(loc => JSON.stringify(loc))),
                    ).map(loc => JSON.parse(loc));
                    setLocations(extractedLocations);
                } else {
                    console.log('Failed to fetch posts');
                }
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        }

        fetchData();
    }, [history]);

    const handleMarkerClick = location => {
        setSelectPosition(location);
    };

    return (
        <React.StrictMode>
            <Navbar />
            <div className="half-half-containter">
                <div style={{ width: '50vw', height: '100vh' }}>
                    <Maps
                        selectPosition={selectPosition}
                        locations={locations}
                        onMarkerClick={handleMarkerClick}
                    />
                </div>
                <div style={{ width: '50vw', height: '100vh' }}>
                    <UserProfile />
                    <SearchBox
                        selectPosition={selectPosition}
                        setSelectPosition={setSelectPosition}
                    />
                </div>
            </div>
        </React.StrictMode>
    );
}

export default ExplorePage;
