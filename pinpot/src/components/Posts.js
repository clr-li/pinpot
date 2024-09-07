import React, { useState, useEffect } from 'react';
import { getUserFromToken } from '../auth';
import axios from 'axios';

function Posts() {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const userInfo = getUserFromToken();
                if (!userInfo) {
                    console.log('User not authenticated');
                    return;
                }

                setUser(userInfo);

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
    }, []);

    return (
        <div>
            {posts.map(data => {
                return <img width={120} height={120} src={data.img} />;
            })}
        </div>
    );
}

export default Posts;
