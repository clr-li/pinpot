import React, { useState, useEffect } from 'react';
import '../index.css';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBox from '../components/SearchBox';
import MyPosts from '../components/MyPosts';
import Maps from '../components/Maps';
import { useNavigate, useLocation } from 'react-router-dom';
import UserProfile from '../components/UserData';
import { getUserFromToken } from '../auth';
import axios from 'axios';
import { postVisibility } from '../enum';

function MapPage() {
    const [locations, setLocations] = useState([]);
    const [selectPosition, setSelectPosition] = useState(null);
    const history = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let userInfo = null;
        try {
            userInfo = getUserFromToken();
        } catch (error) {
            history('/login.html');
        }
        async function fetchData() {
            try {
                // Get the username from the URL parameters
                const params = new URLSearchParams(location.search);
                const username = params.get('username');
                let res = null;

                if (username) {
                    // Fetch user information based on the username from the URL
                    const visibility = postVisibility.PUBLIC;
                    res = await axios.get('http://localhost:8000/get-posts-by-visibility-loc', {
                        params: { username, visibility },
                    });
                } else {
                    res = await axios.get('http://localhost:8000/get-post', {
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
    }, [location.search, history]);

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
                    <MyPosts selectPosition={selectPosition} />
                </div>
            </div>
        </React.StrictMode>
    );
}

export default MapPage;
