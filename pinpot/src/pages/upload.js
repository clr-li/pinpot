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
                <div style={{ width: '50vw' }}>
                    <Maps selectPosition={selectPosition} />
                </div>
                <div style={{ width: '50vw' }}>
                    <SearchBox
                        selectPosition={selectPosition}
                        setSelectPosition={setSelectPosition}
                    />
                    <FileUploader></FileUploader>
                </div>
            </div>
        </React.StrictMode>
    );
}

export default Upload;
