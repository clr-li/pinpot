import React, { useState } from 'react';
import axios from 'axios';
import '../styles/explore.css'; // Include any styles you need

function Explore() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [message, setMessage] = useState(null);

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
                setSearchResults(response.data.data); // Adjust based on actual response structure
                console.log('Search results:', response.data.data);
            } else {
                setMessage({ text: 'Failed to fetch users.', type: 'error' });
                console.log('Failed to fetch users');
            }
        } catch (error) {
            setMessage({ text: 'Error searching users.', type: 'error' });
            console.log('Error searching users:', error);
        }
    };

    const handleFollowUser = async userId => {
        try {
            const response = await axios.post('http://localhost:8000/follow-user', {
                userId,
            });

            if (response.status === 200) {
                setMessage({ text: 'Followed successfully!', type: 'success' });
            } else {
                setMessage({ text: 'Failed to follow.', type: 'error' });
            }
        } catch (error) {
            setMessage({ text: 'Error following user.', type: 'error' });
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
            <div className="search-results">
                {searchResults.length !== 0 &&
                    searchResults.map(user => (
                        <div key={user._id} className="user-card">
                            <div className="user-info">
                                <h3>{user.username}</h3>
                                <button onClick={() => handleFollowUser(user._id)}>Follow</button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Explore;
