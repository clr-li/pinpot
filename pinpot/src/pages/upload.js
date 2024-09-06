// Filename - upload.js
import React, { useState } from 'react';
import Maps from '../components/Maps';
import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";

const uploader = Uploader({
    apiKey: "free" // Get production API keys from Bytescale
  });
const options = { multi: true };

function Upload() {
  const [selectPosition, setSelectPosition] = useState(null);

  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      width: "100vw",
      height: "100vh",
    }}>
      <div style={{ width: "50vw", height: "100%" }}>
        <Maps selectPosition={selectPosition} />
      </div>
      <div style={{ width: "50vw" }}>
        <UploadButton uploader={uploader}
                    options={options}
                    onComplete={files => alert(files.map(x => x.fileUrl).join("\n"))}>
            {({onClick}) =>
            <button onClick={onClick}>
                Upload a file...
            </button>
            }
        </UploadButton>
      </div>
    </div>
  );
}

export default Upload;
