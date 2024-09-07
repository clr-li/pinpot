import React, { useState } from 'react';
import Maps from '../components/Maps';
import SearchBox from '../components/SearchBox';
import Navbar from '../components/Navbar';
import FileUploader from '../components/FileUpload';
import PostDetails from '../components/PostDetails';
import '../styles/map.css';

function PostPage() {
    const [selectPosition, setSelectPosition] = useState(null);
    const [postImage, setPostImage] = useState(null);

    const handlePostUpdate = () => {
        // Handle any logic needed after updating the post settings, e.g., refresh data
    };

    return (
        <React.StrictMode>
            <Navbar />
            <div className="half-half-containter">
                <div className="half-container">
                    <Maps selectPosition={selectPosition} />
                </div>
                <div className="half-container">
                    <SearchBox
                        selectPosition={selectPosition}
                        setSelectPosition={setSelectPosition}
                    />
                    <FileUploader selectPosition={selectPosition} setPostImage={setPostImage} />
                    <PostDetails postImage={postImage} />
                </div>
            </div>
        </React.StrictMode>
    );
}

export default PostPage;
