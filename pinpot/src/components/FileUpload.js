import React, { useState, useEffect } from 'react';
import { getUserFromToken } from '../auth';
import axios from 'axios';

function FileUploader() {
    const [image, setImage] = useState('');
    const [user, setUser] = useState(null);

    // Use useEffect to set user info only once when component mounts
    useEffect(() => {
        try {
            const userInfo = getUserFromToken();
            setUser(userInfo);
        } catch (error) {
            console.log('Error getting user info:', error);
        }
    }, []); // Empty dependency array ensures this runs only once

    function convertToBase64(e) {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.onerror = error => {
            console.log('Error uploading file: ', error);
        };
    }

    async function uploadImage() {
        if (!user) {
            console.log('User not authenticated');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/upload-post', {
                uid: user.id,
                postType: 'image',
                img: image,
                text: '',
                location: [51.505, -0.09],
                visibility: 'public',
                takenDate: Date.now(),
            });

            if (response.status === 201) {
                console.log('File uploaded');
            } else {
                console.log('Failed to upload');
            }
        } catch (e) {
            console.log('Error uploading:', e);
        }
    }

    return (
        <div>
            <div>
                Upload image
                <br />
                <input type="file" onChange={convertToBase64} />
            </div>
            <button onClick={uploadImage}>Upload</button>
            {image && <img width={100} height={100} src={image} alt="Preview" />}
        </div>
    );
}

export default FileUploader;
