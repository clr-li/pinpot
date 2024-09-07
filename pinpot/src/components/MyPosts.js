import React, { useState, useEffect } from 'react';
import { getUserFromToken } from '../auth';
import axios from 'axios';
import '../styles/posts.css';
import '../styles/popup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

function MyPosts(props) {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null); // State for selected post
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

    const formatDate = timestamp => {
        const date = new Date(timestamp);
        return date.toLocaleDateString(); // Format date as needed
    };

    const truncateCaption = caption => {
        return caption.length > 20 ? caption.substring(0, 20) + '...' : caption;
    };

    const handleImageClick = post => {
        setSelectedPost(post);
    };

    const closePopup = () => {
        setSelectedPost(null);
    };

    return (
        <div className="posts-grid">
            {posts.map((data, index) => (
                <div key={index} className="post-container">
                    <img
                        className="post-img"
                        src={data.img}
                        alt="a post"
                        onClick={() => handleImageClick(data)} // Handle click to open popup
                    />
                    <div className="post-date">{formatDate(data.uploadDate)}</div>
                    {data.text && <div className="post-caption">{truncateCaption(data.text)}</div>}
                </div>
            ))}

            {selectedPost && (
                <div className="popup-overlay" onClick={closePopup}>
                    <div className="popup-content" onClick={e => e.stopPropagation()}>
                        <img className="popup-img" src={selectedPost.img} alt="Selected Post" />
                        <div className="popup-caption">{selectedPost.text || 'No caption'}</div>
                        <button className="close-popup" onClick={closePopup}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyPosts;
