// Filename: PostDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PopupMessage from './PopupMessage';
import '../styles/posts.css';
import { postVisibility } from '../enum'; // Ensure this is properly imported
import { getUserFromToken } from '../auth';

function PostDetails(props) {
    const { postImage } = props;
    const [user, setUser] = useState(null);
    const [visibility, setVisibility] = useState(postVisibility.PRIVATE);
    const [takenDate, setTakenDate] = useState(new Date().toISOString().split('T')[0]); // Default to current date
    const [caption, setCaption] = useState('');
    const [message, setMessage] = useState(null);

    useEffect(() => {
        try {
            const userInfo = getUserFromToken();
            if (userInfo) {
                setUser(userInfo);
            }
        } catch (error) {
            console.log('Error getting user info:', error);
        }
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();

        if (!user) {
            setMessage({ text: 'User not authenticated.', type: 'error' });
            return;
        }

        const postData = {
            uid: user.id, // Use the user ID from the token
            img: postImage.img,
            location: postImage.location,
            visibility,
            takenDate: new Date(takenDate).toISOString(),
        };

        if (caption.trim()) {
            postData.text = caption; // Only include caption if it's not empty
        }

        try {
            const response = await axios.post(`http://localhost:8000/upload-post/`, postData);

            if (response.status === 201) {
                setMessage({ text: 'Posted successfully!', type: 'success' });
            } else {
                setMessage({ text: 'Failed to post.', type: 'error' });
            }
        } catch (error) {
            setMessage({ text: 'Error posting.', type: 'error' });
        }
    };

    // Ensure postImage is set before rendering the form
    if (!postImage) {
        return null; // Return null instead of empty
    }

    return (
        <div className="post-settings">
            <h2>Post Details</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="caption">Caption (Optional):</label>
                    <textarea
                        id="caption"
                        value={caption}
                        onChange={e => setCaption(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="visibility">Visibility:</label>
                    <select
                        id="visibility"
                        value={Object.keys(postVisibility).find(
                            key => postVisibility[key] === visibility,
                        )}
                        onChange={e => setVisibility(postVisibility[e.target.value])}
                    >
                        {Object.keys(postVisibility).map(key => (
                            <option key={key} value={key}>
                                {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="takenDate">Date Taken:</label>
                    <input
                        type="date"
                        id="takenDate"
                        value={takenDate}
                        onChange={e => setTakenDate(e.target.value)}
                    />
                </div>
                <button type="submit">Post</button>
            </form>
            {message && <PopupMessage message={message.text} type={message.type} />}
        </div>
    );
}

export default PostDetails;
