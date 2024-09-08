// Filename: TopPosts.js
import React, { useState, useEffect } from 'react';
import { getUserFromToken } from '../auth';
import axios from 'axios';
import '../styles/posts.css';
import '../styles/popup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faHeart } from '@fortawesome/free-solid-svg-icons';
import { postVisibility } from '../enum';

function TopPosts({ selectPosition }) {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [likedPosts, setLikedPosts] = useState(new Set()); // Track liked posts

    useEffect(() => {
        async function fetchData() {
            try {
                const userInfo = getUserFromToken();
                if (!userInfo) {
                    return;
                }

                if (selectPosition) {
                    const res = await axios.get('http://localhost:8000/top-posts-by-loc', {
                        params: {
                            lat: selectPosition.lat,
                            lon: selectPosition.lon,
                            visibility: postVisibility.PUBLIC,
                        },
                    });

                    if (res.status === 200) {
                        const postsData = res.data.data;
                        setPosts(postsData);

                        // Initialize likedPosts set based on response data
                        const likedPostsSet = new Set(
                            postsData
                                .filter(post => post.likes.includes(userInfo.id))
                                .map(post => post._id),
                        );
                        setLikedPosts(likedPostsSet);
                    } else {
                        console.log('Failed to fetch top posts');
                    }
                }
            } catch (error) {
                console.log('Error fetching top posts:', error);
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

    const handleLikeClick = async postId => {
        try {
            const userInfo = getUserFromToken();
            if (!userInfo) {
                return;
            }

            const res = await axios.post('http://localhost:8000/like-post', {
                postId: postId,
                userId: userInfo.id,
            });

            if (res.status === 200) {
                // Update the posts state to reflect the new like status
                setPosts(prevPosts =>
                    prevPosts.map(post => {
                        if (post._id === postId) {
                            const isLiked = post.likes.includes(userInfo.id);
                            const updatedLikes = isLiked
                                ? post.likes.filter(id => id !== userInfo.id)
                                : [...post.likes, userInfo.id];
                            return { ...post, likes: updatedLikes };
                        }
                        return post;
                    }),
                );

                // Toggle like status in the likedPosts set
                setLikedPosts(prev => {
                    const newLikedPosts = new Set(prev);
                    if (newLikedPosts.has(postId)) {
                        newLikedPosts.delete(postId);
                    } else {
                        newLikedPosts.add(postId);
                    }
                    return newLikedPosts;
                });
            } else {
                console.log('Failed to update like status');
            }
        } catch (error) {
            console.log('Error liking post:', error);
        }
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
                    <div className="post-likes">
                        <button className="like-button" onClick={() => handleLikeClick(data._id)}>
                            <FontAwesomeIcon
                                icon={faHeart}
                                className={`like-icon ${likedPosts.has(data._id) ? 'liked' : ''}`}
                            />
                        </button>
                        <span>
                            {data.likes.length} {data.likes.length === 1 ? 'Like' : 'Likes'}
                        </span>
                    </div>
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

export default TopPosts;
