import React from 'react';
import PropTypes from 'prop-types';
import '../styles/explore.css'; // Include any styles you need

const SearchResults = ({ searchResults, handleFollowUser }) => {
    return (
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
    );
};

SearchResults.propTypes = {
    searchResults: PropTypes.array.isRequired,
    handleFollowUser: PropTypes.func.isRequired,
};

export default SearchResults;
