import React, { useState, useEffect } from 'react';
import { getUserFromToken } from '../auth';
import axios from 'axios';

function MyPosts(props) {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const { selectPosition } = props;

    useEffect(() => {
        async function fetchData() {
            try {
                const userInfo = getUserFromToken();
                if (!userInfo) {
                    return;
                }

                setUser(userInfo);

                if (selectPosition && selectPosition.lat && selectPosition.lon) {
                    const res = await axios.get('http://localhost:8000/get-posts-by-loc', {
                        params: {
                            uid: userInfo.id,
                            lat: selectPosition.lat,
                            lon: selectPosition.lon,
                        },
                    });

                    if (res.status === 200) {
                        setPosts(res.data.data);
                    } else {
                        console.log('Failed to fetch posts');
                    }
                }
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        }

        fetchData();
    }, [selectPosition]);

    return (
        <div className="posts-grid">
            {posts.map((data, index) => (
                <img key={index} className="post-img" src={data.img} alt="a post" />
            ))}
        </div>
    );
}

export default MyPosts;
