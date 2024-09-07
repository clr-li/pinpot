// Filename - upload.js
import React, { useState } from 'react';
import Maps from '../components/Maps';
import SearchBox from '../components/SearchBox';
import Navbar from '../components/Navbar';
import FileUploader from '../components/FileUpload';

function Upload() {
    const [selectPosition, setSelectPosition] = useState(null);

    return (
        <React.StrictMode>
            <Navbar></Navbar>
            <div className="half-half-containter">
                <div className="half-container">
                    <Maps selectPosition={selectPosition} />
                </div>
                <div className="half-container">
                    <SearchBox
                        selectPosition={selectPosition}
                        setSelectPosition={setSelectPosition}
                    />
                    <FileUploader selectPosition={selectPosition}></FileUploader>
                </div>
            </div>
        </React.StrictMode>
    );
}

export default Upload;
