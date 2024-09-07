// Filename - map.js
import React, { useState, useEffect } from 'react';
import '../index.css';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBox from '../components/SearchBox';
import MyPosts from '../components/MyPosts';
import Maps from '../components/Maps';
import { useNavigate } from 'react-router-dom';
import UserProfile from '../components/UserData';
import { getUserFromToken } from '../auth';
import axios from 'axios';

function Map() {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [locations, setLocations] = useState([]);
    const history = useNavigate();

    useEffect(() => {
        async function fetchData() {
            // TODO: Turn this into a component
            try {
                const userInfo = getUserFromToken();
                if (!userInfo) {
                    history('/login.html');
                }

                setUser(userInfo);

                const res = await axios.get('http://localhost:8000/get-post', {
                    params: { uid: userInfo.id },
                });

                if (res.status === 200) {
                    let extractedLocations = res.data.data.map(post => post.location);
                    extractedLocations = Array.from(
                        new Set(extractedLocations.map(loc => JSON.stringify(loc))),
                    ).map(loc => JSON.parse(loc));
                    setLocations(extractedLocations);
                    setPosts(res.data.data);
                } else {
                    console.log('Failed to fetch posts');
                }
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    const [selectPosition, setSelectPosition] = useState(null);
    return (
        <React.StrictMode>
            <Navbar></Navbar>
            <div className="half-half-containter">
                <div style={{ width: '50vw' }}>
                    <Maps selectPosition={selectPosition} locations={locations} />
                </div>
                <div style={{ width: '50vw' }}>
                    <UserProfile></UserProfile>
                    <SearchBox
                        selectPosition={selectPosition}
                        setSelectPosition={setSelectPosition}
                    />
                    <MyPosts selectPosition={selectPosition}></MyPosts>
                </div>
            </div>
        </React.StrictMode>
    );
}

export default Map;
