import React, { useState, useEffect } from 'react';
import { getUserFromToken } from '../auth';

function UserProfile() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        try {
            const userInfo = getUserFromToken();
            setUser(userInfo);
        } catch (error) {
            setError('Failed to retrieve user info');
        }
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            {user ? (
                <div>
                    <h1>Welcome, {user.username}</h1>
                    <p>
                        {user.id} {user.email}
                    </p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default UserProfile;
