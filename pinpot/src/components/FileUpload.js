import React, { useState, useEffect } from 'react';
import { getUserFromToken } from '../auth';
import axios from 'axios';

function FileUploader(props) {
    const [image, setImage] = useState('');
    const [user, setUser] = useState(null);
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
            return;
        }

        if (!selectPosition) {
            alert('Please select the location of the image');
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
                console.log('File uploaded');
            } else {
                console.log('Failed to upload');
            }
        } catch (e) {
            console.log('Error uploading:', e);
        }
    }

    return (
        <div className="file-uploader">
            <h2>Upload Image</h2>
            <br />
            <input type="file" accept="image/*" onChange={convertToBase64} />
            {image && <img width={120} height={120} src={image} alt="Preview" />}
            <button onClick={uploadImage}>Upload</button>
        </div>
    );
}

export default FileUploader;
