// Filename: FileUploader.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PopupMessage from './PopupMessage';
import { getUserFromToken } from '../auth';

function FileUploader(props) {
    const [image, setImage] = useState('');
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState(null); // State for message (error or success)
    const { selectPosition } = props;

    useEffect(() => {
        try {
            const userInfo = getUserFromToken();
            setUser(userInfo);
        } catch (error) {
            console.log('Error getting user info:', error);
        }
    }, []);

    async function convertToBase64(e) {
        let file = e.target.files[0];
        if (file) {
            try {
                const base64Image = await fileToBase64(file);
                const resizedImage = await resizeBase64Image(base64Image, file.size);
                setImage(resizedImage);
            } catch (error) {
                console.log('Error processing file:', error);
                setMessage({ text: 'Error processing file.', type: 'error' });
                setTimeout(() => setMessage(null), 3000);
            }
        }
    }

    function fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    function resizeBase64Image(base64Image, fileSize) {
        const targetSizeInKB = 75 * 1024;
        return new Promise(resolve => {
            const img = new Image();
            img.src = base64Image;

            img.onload = function () {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const width = img.width;
                const height = img.height;

                let scale = Math.sqrt(targetSizeInKB / fileSize);
                if (scale > 1) scale = 1;

                const newWidth = width * scale;
                const newHeight = height * scale;

                canvas.width = newWidth;
                canvas.height = newHeight;
                ctx.drawImage(img, 0, 0, newWidth, newHeight);

                function estimateSize(dataURL) {
                    const byteString = atob(dataURL.split(',')[1]);
                    return byteString.length;
                }

                let quality = 1;
                let dataURL;
                do {
                    dataURL = canvas.toDataURL('image/jpeg', quality);
                    const size = estimateSize(dataURL);

                    if (size <= targetSizeInKB) break;

                    quality -= 0.1;
                } while (quality > 0);

                resolve(dataURL);
            };

            img.onerror = function () {
                console.error('Failed to load image.');
                resolve(base64Image);
            };
        });
    }

    async function uploadImage() {
        if (!user) {
            console.log('User not authenticated');
            setMessage({ text: 'User not authenticated.', type: 'error' });
            setTimeout(() => setMessage(null), 3000);
            return;
        }

        if (!selectPosition) {
            setMessage({ text: 'Please select the location of the image.', type: 'error' });
            setTimeout(() => setMessage(null), 3000);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/upload-post', {
                uid: user.id,
                postType: 'image',
                img: image,
                text: '',
                location: selectPosition,
                visibility: 'public',
                takenDate: Date.now(),
            });

            if (response.status === 201) {
                setMessage({ text: 'File uploaded successfully!', type: 'success' });
                setTimeout(() => setMessage(null), 3000); // Hide message after 3 seconds
            } else {
                setMessage({ text: 'Failed to upload file.', type: 'error' });
                setTimeout(() => setMessage(null), 3000);
            }
        } catch (e) {
            console.log('Error uploading:', e);
            setMessage({ text: 'Error uploading file.', type: 'error' });
            setTimeout(() => setMessage(null), 3000);
        }
    }

    return (
        <div className="file-uploader">
            <h2>Upload Image</h2>
            <br />
            <input type="file" accept="image/*" onChange={convertToBase64} />
            {image && <img className="image-preview" src={image} alt="Preview" />}
            <button onClick={uploadImage}>Upload</button>
            {message && <PopupMessage message={message.text} type={message.type} />}
        </div>
    );
}

export default FileUploader;
