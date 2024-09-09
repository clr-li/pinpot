// Filename - SearchResults.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getUserFromToken } from '../auth';
import '../styles/search.css'; // Include any styles you need

const SearchResults = ({ searchResults, handleFollowUser }) => {
    const [followedUsers, setFollowedUsers] = useState([]);
    const [userFollows, setUserFollows] = useState([]);

    useEffect(() => {
        const fetchFollowerCounts = async () => {
            const userInfo = getUserFromToken();
            const followedArray = {};
            const doesUserFollow = {};

            await Promise.all(
                searchResults.map(async user => {
                    try {
                        const response = await axios.get('http://localhost:8000/follower-count', {
                            params: {
                                uid: user._id,
                            },
                        });
                        followedArray[user._id] = response.data.data.map(obj => obj.followerId);
                        doesUserFollow[user._id] = followedArray[user._id].includes(userInfo.id);
                    } catch (error) {
                        console.error('Error fetching follower count:', error);
                    }
                }),
            );
            setFollowedUsers(followedArray);
            setUserFollows(doesUserFollow);
        };

        fetchFollowerCounts();
    }, [searchResults]);

    return (
        <div className="search-results">
            {searchResults.length !== 0 &&
                searchResults.map(user => (
                    <div key={user._id} className="user-info">
                        <Link to={`/explore.html?username=${user.username}`}>@{user.username}</Link>
                        <span className="follower-count">
                            {followedUsers[user._id] !== undefined
                                ? `${followedUsers[user._id].length} ${followedUsers[user._id].length === 1 ? 'follower' : 'followers'}`
                                : 'Loading...'}
                        </span>
                        <button onClick={() => handleFollowUser(user._id)}>
                            {userFollows[user._id] ? 'Unfollow' : 'Follow'}
                        </button>
                    </div>
                ))}
        </div>
    );
};

SearchResults.propTypes = {
    searchResults: PropTypes.array.isRequired,
    handleFollowUser: PropTypes.func.isRequired,
};

export default SearchResults;
