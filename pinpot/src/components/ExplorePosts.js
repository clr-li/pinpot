// Filename - ExplorePosts.js
import React, { useState, useEffect } from 'react';
import { getUserFromToken } from '../auth';
import axios from 'axios';
import '../styles/posts.css';
import '../styles/popup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import { postVisibility } from '../enum';

function ExplorePosts(props) {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const { selectPosition, uids } = props;
    const location = useLocation();

    useEffect(() => {
        async function fetchData() {
            try {
                const userInfo = getUserFromToken();
                if (!userInfo) {
                    return;
                }

                const params = new URLSearchParams(location.search);
                const username = params.get('username');
                let res = null;

                if (selectPosition) {
                    if (username) {
                        res = await axios.get('http://localhost:8000/get-posts-by-username-loc', {
                            params: {
                                username: username,
                                lat: selectPosition.lat,
                                lon: selectPosition.lon,
                                visibility: postVisibility.PUBLIC,
                            },
                        });
                    } else {
                        res = await axios.get('http://localhost:8000/get-posts-by-uids-loc', {
                            params: {
                                uids: uids,
                                lat: selectPosition.lat,
                                lon: selectPosition.lon,
                                visibility: postVisibility.PUBLIC,
                            },
                        });
                    }
                    if (res.status === 201) {
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
                    <div className="square-image-wrapper">
                        <img
                            className="post-img"
                            src={data.img}
                            alt="a post"
                            onClick={() => handleImageClick(data)}
                        />
                    </div>
                    <div className="post-date">{formatDate(data.uploadDate)}</div>
                    {data.text && <div className="post-caption">{truncateCaption(data.text)}</div>}
                </div>
            ))}

            {selectedPost && (
                <div className="popup-overlay" onClick={closePopup}>
                    <div className="popup-content" onClick={e => e.stopPropagation()}>
                        <img className="popup-img" src={selectedPost.img} alt="Selected Post" />
                        <div className="popup-caption">{selectedPost.text}</div>
                        <button className="close-popup" onClick={closePopup}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ExplorePosts;
