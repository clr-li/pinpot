import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/explore.css'; // Include any styles you need
import { useNavigate } from 'react-router-dom';
import { getUserFromToken } from '../auth';
import SearchResults from './SearchResults'; // Import the new component

function Explore() {
    const [user, setUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [message, setMessage] = useState(null);
    const history = useNavigate();

    useEffect(() => {
        try {
            const userInfo = getUserFromToken();
            setUser(userInfo);
        } catch (error) {
            history('/login.html');
        }
    }, [history]);

    const handleSearchChange = e => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = async e => {
        e.preventDefault();

        try {
            const response = await axios.get('http://localhost:8000/search-users', {
                params: {
                    search: searchTerm,
                },
            });

            if (response.status === 200) {
                setSearchResults(response.data.data);
            } else {
                setMessage({ text: 'Failed to fetch users.', type: 'error' });
            }
        } catch (error) {
            setMessage({ text: 'Error searching users.', type: 'error' });
        }
    };

    const handleFollowUser = async followedId => {
        try {
            if (user.id === followedId) {
                setMessage({ text: "Can't follow yourself", type: 'error' });
                return;
            }
            const res = await axios.post('http://localhost:8000/follow-user', {
                followerId: user.id,
                followedId,
            });

            if (res.status === 201) {
                setMessage({ text: 'Followed successfully!', type: 'success' });
            } else {
                setMessage({ text: res.data.data, type: 'error' });
            }
        } catch (error) {
            setMessage({ text: 'Error following user', type: 'error' });
        }
    };

    return (
        <div className="explore-container">
            <h1>Explore Users</h1>
            <form onSubmit={handleSearchSubmit} className="search-form">
                <input
                    type="text"
                    placeholder="Search for users..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button type="submit">Search</button>
            </form>
            {message && <div className={`message ${message.type}`}>{message.text}</div>}
            <SearchResults searchResults={searchResults} handleFollowUser={handleFollowUser} />
        </div>
    );
}

export default Explore;
