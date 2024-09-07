import React, { useState, useEffect } from 'react';
import { getUserFromToken } from '../auth';
import axios from 'axios';

function Posts() {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Function to fetch user data and posts
        async function fetchData() {
            try {
                // Get user info from token
                const userInfo = getUserFromToken();
                if (!userInfo) {
                    console.log('User not authenticated');
                    return;
                }

                // Set user state
                setUser(userInfo);

                // Fetch posts
                const res = await axios.get('http://localhost:8000/get-post', {
                    params: { uid: userInfo.id },
                });

                if (res.status === 200) {
                    setPosts(res.data.data);
                } else {
                    console.log('Failed to fetch posts');
                }
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        }

        fetchData();
    }, []); // Dependency array can be updated to include dependencies as needed

    return (
        <div>
            {posts.map(data => {
                return <img width={100} height={100} src={data.img} />;
            })}
        </div>
    );
}

export default Posts;
