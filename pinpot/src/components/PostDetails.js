// Filename: PostDetails.js
import React, { useState } from 'react';
import axios from 'axios';
import PopupMessage from './PopupMessage';
import '../styles/posts.css';
import { postVisibility } from '../enum';

function PostDetails(props) {
    const { postImage } = props;
    const [visibility, setVisibility] = useState(postVisibility.PRIVATE);
    const [takenDate, setTakenDate] = useState('');
    const [caption, setCaption] = useState('');
    const [message, setMessage] = useState(null);

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:8000/upload-post/`, {
                uid: postImage.uid,
                postType: postImage.postType,
                img: postImage.img,
                text: caption,
                location: postImage.location,
                visibility: visibility,
                takenDate: new Date(takenDate).toISOString(),
            });

            if (response.status === 201) {
                setMessage({ text: 'Posted!', type: 'success' });
            } else {
                setMessage({ text: 'Failed to post.', type: 'error' });
            }
        } catch (error) {
            setMessage({ text: 'Error posting.', type: 'error' });
        }
    };

    return (
        <div className="post-settings">
            <h2>Post Details</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="caption">Caption:</label>
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
                        value={visibility.toString()} // Convert Symbol to string for select value
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
                <button type="submit">Save Settings</button>
            </form>
            {message && <PopupMessage message={message.text} type={message.type} />}
        </div>
    );
}

export default PostDetails;
